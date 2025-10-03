import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function getUserEmails() {
  try {
    const session = await auth();
    if (!session?.user?.email) return [];

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: {
        emails: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return user?.emails ?? [];
  } catch (error) {
    console.error("Error fetching user emails:", error);
    return [];
  }
}

export async function getEmail(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) return null;

    const email = await db.email.findFirst({
      where: { id },
    });
    return email ?? null;
  } catch (error) {
    console.error("Error fetching email:", error);
    return null;
  }
}
