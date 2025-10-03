import BlockSuiteWrapper from "@/components/BlockSuite/BlocksuiteWrapper";
import { getEmail } from "@/lib/actions/emailActions";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const email = await getEmail(id);

  return {
    title: email?.title,
  };
}

export default async function Email({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const email = await getEmail(id);

  if (!email) return <div>email not found</div>;
  return <BlockSuiteWrapper emailContent={email.content} />;
}
