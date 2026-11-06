import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const chillax = localFont({
  src: [
    {
      path: "../public/fonts/Chillax-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FIZZ — High-Velocity Marketing & Digital Creative",
  description: "Next.js marketing engine engineered for exponential brand traction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", chillax.variable, "font-sans", geist.variable)}>
      <body className="bg-canvas text-ink overflow-x-hidden selection:bg-fizzOrange selection:text-white relative font-chillax">
        {children}
      </body>
    </html>
  );
}