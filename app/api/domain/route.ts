import axios from "axios";
import { NextResponse } from "next/server";
import xmljs from "xml-js";
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

  // Generating response using openAIClient
  const response = await openAIClient.chat.completions.create({
    model: AI_FIELDS.MODEL,
    stream: false,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content:
          "You are a domain name provider. Generate 20 .com domains. And use this context to generate based on it. And always make sure to add a random character at the end of every name for example: sidi.com become sidiy.com or sidify.com but make it beautiful. Please do not include any additional details, introduction, or information in the beginning or at the end. And the domains generated should be in array. And every domain name must have a TLD at the end.",
      },
      {
        role: "user",
        content: `"${ideaDescription}".`,
      },
    ],
  });

  // Configuring options for XML parsing
  const options = {
    compact: true,
    ignoreAttributes: false,
  };

  // Making request to Namecheap API to check domain availability
  const ApiUrl =
    process.env.NODE_ENV == "development"
      ? "http://localhost:8000"
      : "https://ideavalidator.onrender.com";
  const { data } = await axios.post(`${ApiUrl}/domain`, {
    domain: JSON.parse(response.choices[0].message.content as string).join(","),
  });

  // Parsing XML response to JSON
  const json = xmljs.xml2json(data, options);

  // Returning JSON response
  return NextResponse.json({
    response: JSON.parse(json).ApiResponse.CommandResponse.DomainCheckResult,
  });
}
