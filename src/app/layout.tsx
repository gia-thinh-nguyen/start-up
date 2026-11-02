import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Besley } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyBookButton } from "@/components/StickyBookButton";
import { site } from "@/content/site";
import "./globals.css";

const besley = Besley({
  subsets: ["latin"],
  variable: "--font-besley",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam-pro",
});

const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Preview and staging builds must stay out of search results.
  robots: isProduction ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  // The phone browser's own bar continues the navy table. Same value as --color-navy.
  themeColor: "#14233a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${besley.variable} ${beVietnamPro.variable}`}>
      <body className="surface-chalk flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:surface-card focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyBookButton />
      </body>
    </html>
  );
}
