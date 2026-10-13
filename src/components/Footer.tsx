import Link from "next/link";
import { site } from "@/content/site";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 font-sans text-xs font-medium tracking-label text-ochre uppercase">
      {children}
    </h2>
  );
}

export function Footer() {
  const { contact, serviceArea } = site;

  return (
    <footer className="bg-navy text-paper [--color-focus:var(--color-ochre)]">
      <div className="mx-auto grid max-w-page gap-12 px-gutter py-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg">
        <div className="lg:col-span-5">
          <p className="font-display text-2xl tracking-label uppercase">{site.name}</p>
          <p className="mt-3 max-w-xs text-paper/80">{site.origin}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <section>
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-2">
              <li>
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="break-words hover:underline">
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram.href}
                  className="hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </section>

          <section>
            <FooterHeading>Where we fit</FooterHeading>
            <p>{serviceArea.studio}</p>
            <p className="mt-2 text-paper/80">{serviceArea.summary}</p>
          </section>

          <section>
            <FooterHeading>Policies</FooterHeading>
            <ul className="space-y-2">
              {site.policies.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-page px-gutter py-5 text-sm text-paper/70 lg:px-gutter-lg">
          © {new Date().getFullYear()} {site.name} · ABN {site.abn}
        </p>
      </div>
    </footer>
  );
}
