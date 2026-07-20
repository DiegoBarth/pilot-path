import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers";

export const metadata: Metadata = {
  title: "PilotPath",
  description:
    "Your journey to becoming a pilot. Aviation learning platform for student pilots.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}