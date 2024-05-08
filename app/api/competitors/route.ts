import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "process";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// For getting your IP address: https://ip.web-hosting.com

// Retrieving environment variables for Namecheap API authentication
const API_KEY_NAMECHEAP = process.env.API_KEY_NAMECHEAP;
const USERNAME_NAMECHEAP = process.env.USERNAME_NAMECHEAP;
const CLIENT_IP_NAMECHEAP = process.env.CLIENT_IP_NAMECHEAP;

// Create an OpenAI API client
// but configure it to point to GROQ ai
const groq = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  // PERPLEXITY_API_KEY
  baseURL: "https://api.perplexity.ai",
  // https://api.perplexity.ai
  // https://api.groq.com/openai/v1
});

// Handler for POST requests
export async function POST(request: Request) {
  // Extracting idea description from request body
  const { ideaDescription } = await request.json();

  // Generating response using GROQ
  const response = await groq.chat.completions.create({
    model: "llama-3-sonar-small-32k-chat",
    // llama-3-sonar-small-32k-online
    // mixtral-8x7b-32768
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
