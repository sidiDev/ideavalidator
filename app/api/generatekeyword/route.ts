import { AI_FIELDS } from "@/lib/utils";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// For getting your IP address: https://ip.web-hosting.com

// Create an OpenAI API client
const openAIClient = new OpenAI({
  apiKey: AI_FIELDS.API_KEY,
  baseURL: AI_FIELDS.BASE_URL,
});

// Handler for POST requests
export async function POST(request: Request) {
  // Extracting idea description from request body
  const { ideaDescription } = await request.json();

  // Generate a keyword based on the idea description
  const response = await openAIClient.chat.completions.create({
    model: AI_FIELDS.MODEL,
    stream: false,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content:
          "You're a SEO expert. Generate one keyword from this description. The response should be one perfect short Keyword from one to three words. Please do not include any additional details, introduction, or information in the beginning or at the end.",
      },
      {
        role: "user",
        content: `"${ideaDescription}".`,
      },
    ],
  });

  return NextResponse.json({
    keyword: response.choices[0].message.content,
  });
}
