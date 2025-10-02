import { getEmail } from "@/lib/actions/emailActions";

export default async function Email({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const email = await getEmail(id);

  if (!email) return <div>email not found</div>;
  return <div>{email.content}</div>;
}
