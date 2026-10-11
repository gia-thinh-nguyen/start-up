# Order platform (cloud engineering portfolio project)

Start this after the website has launched.

A separate backend for the order pipeline in "Behind the scenes", built to show cloud engineering skills: microservices, AWS, Kubernetes and system design. The public website stays on Vercel as planned. Use **fake seeded data only**: Airtable stays the real order tracker until this platform is proven.

## Core set (nothing else for now)

| Tool | Job in this project |
|---|---|
| Go | Language for the service and both Lambdas (low memory use, fits a free-tier server) |
| Docker | Packages order-svc as a container image |
| docker-compose | Runs order-svc and Postgres on your laptop |
| Postgres | order-svc's database, running inside k3s |
| k3s | Lightweight Kubernetes on one EC2 instance, deployed with plain YAML files (no Helm) |
| EC2 | The server that runs k3s (t3.micro on the free tier, or t3.small on credits) |
| VPC | Private network, one public subnet, security group as the firewall |
| IAM | Least-privilege roles for EC2 and each Lambda |
| S3 | Workshop order sheets and Terraform state |
| SNS | Publishes events to every interested queue (fan-out) |
| SQS | Queues events for each consumer, with a dead-letter queue (DLQ) for failures |
| Lambda | Payment webhook receiver and workshop handoff generator |
| Terraform | Creates and destroys all AWS resources from code |
| GitHub Actions | Tests, builds and pushes images on every commit |

## Architecture

```
Square sandbox ──HTTPS──> payment-webhook (Lambda Function URL)
                                │ publish "payment.received"
                                ▼
                      SNS topic: order-events
              (subscription filters route by event type)
                ┌───────────────┴────────────────┐
                ▼                                ▼
     SQS order-svc-inbox (+DLQ)        SQS workshop-inbox (+DLQ)
                │                                │
                ▼                                ▼
  EC2 → k3s: order-svc + Postgres      workshop-handoff (Lambda) ──> S3 order sheets
                │
                └── publish "order.stage_changed" ──> SNS topic: order-events
```

- **order-svc** (container on k3s): clients, orders, measurements and the order stage machine: Booked → Measured → Deposit paid → In production → Shipped → Arrived → Final fitting → Balance paid → Done. Consumes payment events from its queue.
- **payment-webhook** (Lambda): the only public HTTPS entry point. Verifies Square's signature, then publishes an event.
- **workshop-handoff** (Lambda): when an order reaches "Deposit paid", builds the order sheet for the Saigon workshop and saves it to a private S3 bucket.
- order-svc's API and the Kubernetes API (port 6443) are open **only to your own IP**. Measurements are personal data and must not be on a public HTTP endpoint.

## Repo layout

Use a separate public GitHub repo, e.g. `saigon-cut-platform`, so the website repo stays private.

```
saigon-cut-platform/
├── services/order-svc/           Go API + SQS consumer, Dockerfile, tests
├── functions/payment-webhook/    Go Lambda
├── functions/workshop-handoff/   Go Lambda
├── k8s/                          plain YAML: namespace, postgres, order-svc, ingress
├── terraform/                    VPC, EC2 + k3s, IAM, S3, SNS, SQS, Lambda
├── docker-compose.yml            local Postgres + order-svc
├── .github/workflows/ci.yml      tests, build, push image
└── README.md                     diagram, decisions, costs, how to run
```

## Step-by-step build

Do one step at a time. Each step ends with a check: don't move on until it passes.

**Step 0. Setup and cost guardrails** (1 evening)

1. Create an AWS account. Turn on MFA for the root user, then create an admin IAM user (or IAM Identity Center user) for daily use and stop using root.
2. In AWS Budgets, create alerts at US$1 and US$5. Use region **us-east-1** for everything.
3. Install Go, Docker Desktop, Terraform, AWS CLI and kubectl. Run `aws configure`.
4. Create the GitHub repo with the layout above and a `.gitignore` that excludes `.env`, `*.tfstate`, `*.tfvars` and kubeconfig files.

Done when: `aws sts get-caller-identity` shows your admin user, and the budget alerts are active.

**Step 1. order-svc on your laptop** (1–2 weeks)

1. Build a Go HTTP API using the standard library router:
   - `POST /clients`, `POST /orders`, `GET /orders/{id}`
   - `PUT /orders/{id}/measurements`
   - `POST /orders/{id}/stage` (body: the next stage)
   - `GET /healthz` (process alive) and `GET /readyz` (database reachable)
2. Tables: `clients`, `orders`, `measurements`, `order_history` (every stage change with a timestamp). Keep the schema in SQL migration files.
3. Put the stage machine in its own package. It must reject illegal moves (e.g. Booked → Shipped).
4. Write unit tests for the stage machine and one integration test against a real Postgres.
5. Log in JSON. Never log names, phone numbers or measurements: log order IDs only.

Done when: `go test ./...` passes, and every stage can be walked through with curl.

**Step 2. Docker and docker-compose** (2–3 evenings)

1. Write a multi-stage Dockerfile: build in a Go image, run in a distroless or scratch image as a non-root user. Aim for an image under 30 MB.
2. Write `docker-compose.yml` with Postgres (with a volume) and order-svc, and read config from environment variables.
3. Add a seed script that creates fake clients and orders.

Done when: `docker compose up` starts everything, the curl flow from step 1 works, and data survives a restart.

**Step 3. Terraform: AWS foundation** (1 week)

1. Create a bucket for Terraform state by hand (or with a tiny bootstrap config), with versioning on. Use the S3 backend with `use_lockfile = true`.
2. Write Terraform for:
   - VPC, one public subnet, internet gateway and route table (no NAT gateway, no load balancer)
   - Security group: port 80 and 6443 from **your IP only**, SSH (22) from your IP only
   - EC2 t3.micro (Amazon Linux 2023) with IMDSv2 required and hop limit 2 (so pods can use the instance role), plus `user_data` that adds a 2 GB swap file and installs k3s
   - IAM instance profile (empty for now; permissions come in step 6)
   - Private S3 bucket for workshop order sheets (block public access, encryption on)
3. Output the instance's public IP.

Done when: `terraform apply` builds everything, you can SSH in and `sudo k3s kubectl get nodes` shows `Ready`, then `terraform destroy` removes it all cleanly. Rebuild it afterwards.

**Step 4. Deploy order-svc to k3s** (1 week)

1. Copy `/etc/rancher/k3s/k3s.yaml` to your laptop, change the server address to the instance's public IP, and check that `kubectl get nodes` works.
2. Push the order-svc image to GitHub Container Registry (ghcr.io) by hand for now.
3. Write plain YAML in `k8s/`:
   - `namespace.yaml`
   - `postgres.yaml`: StatefulSet with a PersistentVolumeClaim (k3s's built-in local-path storage), Service, and a Secret created with `kubectl create secret` (never committed)
   - `order-svc.yaml`: Deployment with CPU/memory requests and limits, liveness probe on `/healthz`, readiness probe on `/readyz`, and a Service
   - `ingress.yaml`: routes port 80 to order-svc through Traefik (built into k3s)
4. Apply with `kubectl apply -f k8s/`.

Done when: curl from your laptop to `http://<public-ip>/orders/...` works, and deleting the order-svc pod (`kubectl delete pod ...`) is followed by Kubernetes starting a new one with no data lost.

**Step 5. GitHub Actions CI** (2–3 evenings)

1. On every pull request: `go vet`, `go test ./...`, `terraform fmt -check`, `terraform validate`.
2. On merge to `main`: build the image, tag it with the git commit SHA, push to ghcr.io.
3. Deploy stays a manual `kubectl set image` (or a `make deploy` target) from your laptop. That keeps the Kubernetes API closed to the internet. Write down this trade-off in the README.

Done when: a pull request with a failing test is blocked, and a merge produces a new image you can deploy with one command.

**Step 6. Events: SNS, SQS and Lambda** (2 weeks)

1. Terraform for:
   - SNS topic `order-events`
   - SQS queues `order-svc-inbox` and `workshop-inbox`, each with a DLQ (max 5 receives)
   - Subscriptions with filter policies on the event type: payments go to `order-svc-inbox`, stage changes go to `workshop-inbox`
   - Lambda `payment-webhook` (Go, `provided.al2023`, arm64) with a Function URL
   - Lambda `workshop-handoff` with `workshop-inbox` as its trigger
   - IAM: the EC2 role may only receive and delete from `order-svc-inbox` and publish to `order-events`; each Lambda may only touch its own queue, topic and bucket path
2. **payment-webhook**: verify Square's HMAC signature header (reject anything unsigned), then publish `payment.received` with Square's event ID. The signature key comes from a Terraform variable set in your shell, never committed.
3. **order-svc**: add a background worker that polls `order-svc-inbox`. Record each processed event ID in a `processed_events` table and skip duplicates (idempotency). Move the order to "Deposit paid" or "Balance paid", then publish `order.stage_changed`.
4. **workshop-handoff**: on "Deposit paid", write the order sheet (measurements, fabric code, style options) as HTML to S3 at `workshop/<order-id>.html`.

Done when:
- A Square sandbox test webhook moves an order to "Deposit paid" and the order sheet appears in S3.
- Sending the same webhook twice changes the order only once.
- A deliberately broken message ends up in the DLQ instead of looping forever.
- A webhook with a wrong signature is rejected.

**Step 7. Write it up** (1 week)

1. README: architecture diagram, how to run locally, how to deploy, how to destroy.
2. A "Decisions" section with a short paragraph for each choice: k3s on one EC2 instead of EKS (cost; single point of failure accepted), Lambda for bursty webhooks vs a container for the steady API, SNS fan-out with filters, no NAT gateway, manual deploy to keep the Kubernetes API private.
3. Cost section: what it actually cost you per month (from the AWS bill).
4. Time a full rebuild from nothing (`terraform apply` to working system) and record it.
5. A 2–3 minute screen recording of the payment → order → workshop sheet flow.

Done when: someone else could clone the repo and rebuild the whole system from the README alone.

## Cost

About **US$0–5 a month** on the free tier or credits. Never create a NAT gateway, load balancer or EKS cluster in this project: if `terraform plan` shows one, stop and check.

