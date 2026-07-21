import type { Metadata } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import { companyInfo } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${companyInfo.name} — Remonty, renowacje i technologia laserowa`,
  description:
    "Kompleksowe usługi remontowe, malarskie i renowacyjne wykonywane z wyjątkową dokładnością. Tradycyjne rzemiosło połączone z nowoczesną technologią laserową.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${manrope.variable} ${spaceMono.variable}`}>
      <body className="font-sans">
        <a
          href="#tresc"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-200 focus-visible:rounded-pill focus-visible:bg-brass focus-visible:px-5 focus-visible:py-3 focus-visible:text-ui focus-visible:font-bold focus-visible:text-bg"
        >
          Pomiń nawigację
        </a>
        {children}
      </body>
    </html>
  );
}
