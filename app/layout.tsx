import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_TITLE =
  "Udaya Kumar Sivagurunathan | Lead UX Designer | Author | Gen AI Architect";
const SITE_DESCRIPTION =
  "Website of Udaya Kumar Sivagurunathan | Lead UX Designer | Author | Gen AI Architect.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.udayakumar.in"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.udayakumar.in",
    siteName: "Udaya Kumar Sivagurunathan",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#0d0d0d" }}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
