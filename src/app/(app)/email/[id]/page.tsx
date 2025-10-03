import BlockSuiteWrapper from "@/components/BlockSuite/BlocksuiteWrapper";
import { getEmail } from "@/lib/actions/emailActions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

  if (!email) notFound();

  return (
    <main className="h-full flex flex-col w-xl">
      <div className="flex-grow pb-4">
        <BlockSuiteWrapper emailContent={email?.content} />
      </div>
    </main>
  );
}
