import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function getUserEmails() {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { emails: true },
  });

  return user?.emails ?? [];
}

export async function getEmail(id: string) {
  const session = await auth();
  if (!session?.user?.email) return [];

  const email = await db.email.findFirst({
    where: { id: id },
  });

  return email ?? null;
}
