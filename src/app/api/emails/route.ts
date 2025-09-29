import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth(); // get logged-in user
    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { content, title } = await req.json();

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const savedEmail = await db.email.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

    return Response.json(savedEmail);
  } catch (error) {
    console.error("Error saving email:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
