import { NextRequest } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import { auth } from "@/lib/auth";

// export const runtime = "edge";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { prompt, tone, length, purpose } = await req.json();

    const model = google("gemini-2.5-flash");

    const titlePrompt = `
      just Suggest a short descriptive title for this email at most 6 words.:
      - Prompt: ${prompt}
      - Tone: ${tone}
      - Length: ${length}
      - Purpose: ${purpose}
    `;

    const titleResponse = await generateText({
      model,
      prompt: titlePrompt,
    });
    const title = titleResponse.text.trim() || "Untitled Email";

    const systemPrompt = `
      You are an AI email assistant.
      Generate the full email as **semantic HTML**.
      Use only safe tags:
      - <h1>, <h2> for headings
      - <p> for paragraphs
      - <ul>, <ol>, <li> for lists
      - <strong>, <em> for emphasis
      - <a href=""> for links

      Details:
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
    return response.toTextStreamResponse({
      headers: {
        "X-Email-Title": encodeURIComponent(title),
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Gemini streaming error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
