import { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { auth } from "@/lib/auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { prompt, tone, length, purpose } = await req.json();

    const model = google("gemini-2.5-flash");

    const systemPrompt = `
You are an AI email assistant.
Generate an email with these details:
- Prompt: ${prompt}
- Tone: ${tone}
- Length: ${length}
- Purpose: ${purpose}
`;

    const response = streamText({
      model,
      prompt: systemPrompt,
      onError({ error }) {
        console.error(error);
      },
    });
    return response.toTextStreamResponse();
  } catch (error) {
    console.error("Gemini streaming error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
