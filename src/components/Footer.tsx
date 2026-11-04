import Link from "next/link";
import { ContactLink } from "@/components/ContactLink";
import { WithTodos } from "@/components/Todo";
import { site } from "@/content/site";

/**
 * The table's top edge, which is where the piece above it was cut: the same neck curve and shoulder
 * slope as the first screen, with one notch and a seam. It rises over the bottom of the piece above,
 * so the last section on a page needs at least hem-lg of space below its content.
 */
function HemEdge() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full h-hem translate-y-px lg:h-hem-lg"
    >
      <svg viewBox="0 0 100 48" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path className="fill-navy" d="M0 48V30C16 30 30 20 40 4L100 30V48Z" />
        <path className="seam" d="M0 45C16 45 30 35 40 19L100 45" />
      </svg>
      {/* Drawn apart from the edge so stretching the edge to fit the screen can't distort it. */}
      <svg
        viewBox="0 0 14 14"
        className="absolute top-[37.2%] left-[72%] size-3.5 -translate-x-1/2 -translate-y-3"
      >
        <path className="fill-navy" d="M0 14 7 0 14 14Z" />
      </svg>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2.5 text-subheading text-ochre">{children}</h2>;
}

export function Footer() {
  const { contact, serviceArea } = site;

  return (
    <footer className="surface-table relative">
      <HemEdge />

      <div className="mx-auto grid max-w-page grid-cols-1 gap-12 px-gutter pt-10 pb-section lg:grid-cols-12 lg:gap-8 lg:px-gutter-lg lg:pt-16">
        <div className="lg:col-span-4">
          <p className="font-display text-title">{site.name}</p>
          <p className="mt-4 max-w-sm text-lede">{site.origin}</p>
        </div>

        {/* Contact and Policies take their content's width so the email stays on one line. */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[max-content_minmax(0,1fr)_max-content] sm:gap-8 lg:col-span-8">
          <section>
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-2.5">
              <li>
                <ContactLink text={contact.phone} href={contact.phoneHref} />
              </li>
              <li>
                <ContactLink text={contact.email} href={`mailto:${contact.email}`} />
              </li>
              {contact.instagram && (
                <li>
                  <ContactLink text={contact.instagram.label} href={contact.instagram.href} external />
                </li>
              )}
            </ul>
          </section>

          <section>
            <FooterHeading>Where we fit</FooterHeading>
            <p>
              <WithTodos text={serviceArea.summary} />
            </p>
          </section>

          <section>
            <FooterHeading>Policies</FooterHeading>
            <ul className="space-y-2.5">
              {Object.values(site.policies).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="swap underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="text-fine lg:col-span-12">
          © {new Date().getFullYear()} {site.name} · ABN <WithTodos text={site.abn} />
        </p>
      </div>
    </footer>
  );
}
