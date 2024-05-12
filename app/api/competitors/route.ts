import { NextResponse } from "next/server";
import OpenAI from "openai";
import { AI_FIELDS } from "@/lib/utils";

// Create an OpenAI API client
const openAIClient = new OpenAI({
  apiKey: AI_FIELDS.API_KEY,
  baseURL: AI_FIELDS.BASE_URL,
});

// Handler for POST requests
export async function POST(request: Request) {
  // Extracting idea description from request body
  const { ideaDescription } = await request.json();

  const response = await openAIClient.chat.completions.create({
    model: AI_FIELDS.MODEL,
    stream: false,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: `You're a marketer and entrepreneur with many years of experience. Analyze this project idea and bring back the top 7 popular competitors. And please don't include any blog, article, community or social network. Your response should be specific. Your response structure should be JSON and look like: [{'link': 'competitorWebsiteLink', 'name': 'competitorName', 'description': 'competitorDescription'}, ...] And please do not include any additional details, introduction, or information in the beginning or at the end.`,
      },
      {
        role: "user",
        content: `"${ideaDescription}".`,
      },
    ],
  });

  return NextResponse.json(
    JSON.parse(response.choices[0].message.content as string)
  );
}
