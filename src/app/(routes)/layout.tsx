import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import ThemeObserver from "@/components/ThemeObserver";
import {Theme} from "@radix-ui/themes";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "@radix-ui/themes/styles.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Infocus",
  description: "A modern photo sharing platform built with Next.js",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode,
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}>
        <Theme>
          {modal}
          <div className="flex min-h-screen bg-background">
            {/* Desktop Navigation */}
            <DesktopNav />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              <main className="flex-1 pb-20 md:pb-0 pt-4 px-4 lg:px-8 max-w-4xl mx-auto w-full">
                <div className="animate-in">
                  {children}
                </div>
              </main>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </Theme>
        <ThemeObserver />
      </body>
    </html>
  );
}
