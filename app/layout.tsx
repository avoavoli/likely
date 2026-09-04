import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Likely — Your likes. Your people. Your next adventure.",
  description:
    "Skip the endless planning and small talk. Likely connects with your social media to match your niche interests with casual, small-group activities happening in public spaces around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-white text-zinc-950 selection:bg-zinc-200 selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
