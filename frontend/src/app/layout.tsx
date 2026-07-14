import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}