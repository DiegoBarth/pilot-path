import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { Providers } from "@/providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PilotPath",
  description:
    "Your journey to becoming a pilot. Aviation learning platform for student pilots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}