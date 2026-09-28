import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { nimbusSans } from "../../lib/fonts";
import { AppShell } from "@/components/AppShell";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://gustirais.com";
const SITE_TITLE = "Gusti Rais — Software Engineer & Data Scientist";
const SITE_DESCRIPTION =
  "Portfolio of Gusti Rais, a Software Engineer and Data Scientist specializing in high-performance systems and predictive modeling.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Gusti Rais",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Gusti Rais",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gusti Rais",
  url: SITE_URL,
  jobTitle: "Software Engineer & Data Scientist",
  sameAs: ["https://github.com/goosetea04"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the head script may add data-intro-seen before hydration
    <html lang="en" className={nimbusSans.variable} suppressHydrationWarning>
      <head>
        {/* Runs before first paint so a returning visitor never sees the intro overlay flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('intro-seen')==='1')document.documentElement.setAttribute('data-intro-seen','')}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

