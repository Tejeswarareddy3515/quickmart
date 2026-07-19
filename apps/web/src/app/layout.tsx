import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QuickMart - Groceries in 10 Minutes",
    template: "%s | QuickMart",
  },
  description: "Fresh groceries, daily essentials, and your favorite brands delivered in 10 minutes. India's fastest quick commerce platform.",
  keywords: ["quick commerce", "grocery delivery", "10 minute delivery", "online grocery", "fresh produce"],
  authors: [{ name: "QuickMart" }],
  creator: "QuickMart",
  metadataBase: new URL("https://quickmart.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://quickmart.com",
    title: "QuickMart - Groceries in 10 Minutes",
    description: "Fresh groceries delivered in 10 minutes. 5000+ products, real-time tracking, secure payments.",
    siteName: "QuickMart",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "QuickMart - India's Fastest Grocery Delivery",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickMart - Groceries in 10 Minutes",
    description: "Fresh groceries delivered in 10 minutes",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://quickmart.com",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f23" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
