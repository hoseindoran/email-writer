import Link from "next/link";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { getUserEmails } from "@/lib/actions/emailActions";

interface Email {
  id: string;
  title: string;
  createdAt: Date;
}

export default async function EmailHistory() {
  const emails: Email[] = await getUserEmails();

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {emails.length === 0 && (
          <SidebarMenuItem>
            <span className="text-gray-500 text-sm">No emails yet</span>
          </SidebarMenuItem>
        )}

        {emails.map((email) => (
          <SidebarMenuItem key={email.id}>
            <SidebarMenuButton asChild>
              <Link href={`/emails/${email.id}`}>
                <span>{email.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
