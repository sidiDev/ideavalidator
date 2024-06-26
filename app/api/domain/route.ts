const whoiser = require("whoiser");
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

  const getOnlyAvailableDomains: {}[] = [];

  const availableDomains = JSON.parse(
    response.choices[0].message.content as string
  ).map(async (item: string) => {
    const checkAvailability = await isDomainAvailable(item);
    if (checkAvailability.available) {
      getOnlyAvailableDomains.push({
        domain: checkAvailability.domain,
        name: item.replace(/\..*/, ""),
      });
    }
  });

  await Promise.all(availableDomains);

  // Returning JSON response
  return NextResponse.json({
    response: getOnlyAvailableDomains,
  });
}

// Method to check domain availability
async function isDomainAvailable(domainName: string) {
  const domainWhois = await whoiser(domainName, { follow: 1 });
  const firstDomainWhois = whoiser.firstResult(domainWhois);
  const firstTextLine = (firstDomainWhois.text[0] || "").toLowerCase();
  let domainAvailability = "unknown";
  const domainStatusArr = firstDomainWhois["Domain Status"];
  if (
    firstTextLine.includes(`no match for "${domainName}"`) ||
    firstTextLine.includes("domain not found") ||
    (domainStatusArr &&
      domainStatusArr[0]?.toLowerCase().includes("no object found"))
  ) {
    domainAvailability = "available";
  }
  if (firstTextLine.includes("is reserved")) {
    domainAvailability = "reserved";
  }
  return {
    domain: domainName,
    available: domainAvailability === "available",
  };
}
