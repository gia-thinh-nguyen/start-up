---
target_identity: "file:C:\\Users\\Thinh\\Desktop\\start-up\\saigon-tailors\\src\\app\\contact\\page.tsx"
target_fingerprint: "sha256:21d5cb29cf58316f4fb9c8763f5f504dedd3f8fadb44f7fda74ce1da527efa44"
target_path: "C:\\Users\\Thinh\\Desktop\\start-up\\saigon-tailors\\src\\app\\contact\\page.tsx"
timestamp: 2026-11-03T01-32-35Z
slug: src-app-contact-page-tsx
---
Method: dual-agent. Score 26/40. Detector: 2 advisories, both false positives (a [TODO] straggler; the ruled message lines), 0 non-advisory. Overlay skipped: no interactive browser tool.

Heuristics: 1=2 sending not announced, no current-page mark; 2=3 "fitting" vs "measurement"; 3=2 bar could lose a draft; 4=3; 5=2 silent 2,000 limit; 6=3 labels sat with the wrong line; 7=3; 8=3 footer repeats details; 9=3 invalid line faint; 10=2 privacy page unbuilt.

Priority issues
- [P1] Sending state not announced, disabled button dropped focus. Now a status message and aria-disabled with a double-send guard.
- [P1] Booking bar over the keyboard, and a mis-tap loses the message. Bar now steps aside while a field has focus (checked by computed style; keyboard not tested on a real phone).
- [P2] Labels closer to the previous field than their own. Fixed.
- [P2] Sent state a dead end. Book button added; no reply time, as that fact doesn't exist; h1 and lede stay. In NOTES.
- [P2] Direct contact buried on phones. Link added under the lede.

Questions skipped: owner already answered in redesign/preamble.md
