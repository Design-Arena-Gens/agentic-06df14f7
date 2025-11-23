import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Finance | Opportunités de Direction Comptable & Financière",
  description:
    "Sélection d'offres pour responsables comptables, managers finance et directeurs financiers à forte dimension stratégique.",
  keywords: [
    "emploi finance",
    "responsable comptable",
    "directeur financier",
    "FP&A",
    "contrôle de gestion",
  ],
  openGraph: {
    title: "Agentic Finance | Opportunités de Direction Comptable & Financière",
    description:
      "Trouvez votre prochaine mission de leadership en comptabilité, finance et contrôle de gestion.",
    url: "https://agentic-06df14f7.vercel.app",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
