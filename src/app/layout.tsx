import type { Metadata } from "next";
import MainProviders from "@/providers/MainProviders";
import { auth } from "@/lib/auth";
import "./globals.css";
import "@blocksuite/presets/themes/affine.css";

export const metadata: Metadata = {
  title: "Email Writer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className="h-screen bg-gray-100">
        <MainProviders session={session}>{children}</MainProviders>
      </body>
    </html>
  );
}
