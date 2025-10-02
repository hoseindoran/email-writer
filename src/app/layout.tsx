import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import MainProviders from "@/providers/MainProviders";
import "./globals.css";
import "@blocksuite/presets/themes/affine.css";

export const metadata: Metadata = {
  title: "Email Writer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-100">
        <MainProviders>
          <main className="mx-auto">
            <AppSidebar />
            {children}
          </main>
        </MainProviders>
      </body>
    </html>
  );
}
