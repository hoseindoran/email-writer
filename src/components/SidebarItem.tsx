"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Email } from "./EmailHistory";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function SidebarItem({ email }: { email: Email }) {
  const pathname = usePathname();
  const isActive = pathname === `/email/${email.id}`;

  return (
    <SidebarMenuItem key={email.id}>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={`/email/${email.id}`}>
          <span>{email.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
