import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BiheSewa - Privacy-First Matrimonial Platform",
  description: "Your privacy matters. A secure and private platform for meaningful connections.",
  keywords: ["matrimonial", "marriage", "privacy", "secure", "bihesewa"],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "BiheSewa - Privacy-First Matrimonial Platform",
    description: "Your privacy matters. A secure and private platform for meaningful connections.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
