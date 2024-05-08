import { NextResponse } from "next/server";
import OpenAI from "openai";

// For getting your IP address: https://ip.web-hosting.com

// Retrieving environment variables for Namecheap API authentication

// Create an OpenAI API client
// but configure it to point to GROQ ai
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  // PERPLEXITY_API_KEY
  baseURL: "https://api.groq.com/openai/v1",
  // https://api.perplexity.ai
  // https://api.groq.com/openai/v1
});

// Handler for POST requests
export async function POST(request: Request) {
  // Extracting idea description from request body
  const { ideaDescription } = await request.json();

  // Generating response using GROQ
  const response = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    // llama-3-sonar-small-32k-online
    // mixtral-8x7b-32768
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
