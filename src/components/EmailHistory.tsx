import SidebarItem from "./SidebarItem";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { getUserEmails } from "@/lib/actions/emailActions";

export interface Email {
  id: string;
  title: string;
  content: string;
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
          <SidebarItem email={email} key={email.id} />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
