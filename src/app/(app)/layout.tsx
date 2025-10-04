import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen flex-col md:flex-row">
        <AppSidebar />
        <main className="flex-1 mx-auto w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
