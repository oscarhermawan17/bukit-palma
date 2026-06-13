import type { Metadata } from "next";
import { Hanken_Grotesk, Libre_Caslon_Text, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const libreCaslonText = Libre_Caslon_Text({
  variable: "--font-libre-caslon-text",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "GKPB Jemaat Tabanan",
    template: "%s · GKPB Jemaat Tabanan",
  },
  description:
    "Gereja Kristen Protestan di Bali Jemaat Tabanan. Hadir untuk melayani dan menjadi berkat bagi sesama dalam kasih Kristus.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://bukitpalma.vercel.app"
  ),
  openGraph: {
    siteName: "GKPB Jemaat Tabanan",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sourceSans3.variable} ${hankenGrotesk.variable} ${libreCaslonText.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
