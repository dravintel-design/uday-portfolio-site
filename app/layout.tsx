import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UDAYA KUMAR SIVAGURUNATHAN | LEAD UX DESIGNER & AGENTIC AI ARCHITECT",
  description:
    "Cinematic portfolio of Udaya Kumar Sivagurunathan: Lead UX Designer & Agentic AI Architect.",
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
