import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Hemo - Hayat Kurtaran Bağlantı | Kan Bağışı Platformu",
  description: "Hemo, kan bağışçıları ile ihtiyaç sahiplerini hızlıca buluşturan Türkiye'nin en modern kan bağışı platformudur. Hayat kurtarmak için hemen katılın!",
  keywords: ["kan bağışı", "kan ihtiyacı", "acil kan", "bağış", "hemo", "kan grubu", "kan bankası", "Türkiye"],
  authors: [{ name: "Hemo Team" }],
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Hemo - Hayat Kurtaran Bağlantı",
    description: "Kan bağışçıları ile ihtiyaç sahiplerini buluşturan modern platform.",
    url: "https://hemo.com.tr",
    siteName: "Hemo",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Hemo Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemo - Hayat Kurtaran Bağlantı",
    description: "Kan bağışçıları ile ihtiyaç sahiplerini buluşturan modern platform.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
