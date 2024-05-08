import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "process";
import xmljs from "xml-js";
import OpenAI from "openai";

// For getting your IP address: https://ip.web-hosting.com

// Retrieving environment variables for Namecheap API authentication
const API_KEY_NAMECHEAP = process.env.API_KEY_NAMECHEAP;
const USERNAME_NAMECHEAP = process.env.USERNAME_NAMECHEAP;
const CLIENT_IP_NAMECHEAP = process.env.CLIENT_IP_NAMECHEAP;

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
    // llama-3-sonar-small-32k-chat
    // mixtral-8x7b-32768
    stream: false,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content:
          "You are a domain name provider. Generate 20 .com domains. And use this context to generate based on it. And always make sure to add a random character at the end of every name for example: sidi.com become sidiy.com or sidify.com but make it beautiful. Please do not include any additional details, introduction, or information in the beginning or at the end. And the domains generated should be in array. And every domain name must have a TLD at the end",
      },
      {
        role: "user",
        content: `"${ideaDescription}".`,
      },
    ],
  });

  console.log(response.choices[0].message.content);

  // Configuring options for XML parsing
  const options = {
    compact: true,
    ignoreAttributes: false,
  };

  // Determining API URL based on environment
  const url =
    env.NODE_ENV == "development"
      ? "https://api.sandbox.namecheap.com/xml.response"
      : "https://api.namecheap.com/xml.response";

  // Making request to Namecheap API to check domain availability
  const { data } = await axios.get(
    `${url}?ApiUser=${USERNAME_NAMECHEAP}&ApiKey=${API_KEY_NAMECHEAP}&UserName=${USERNAME_NAMECHEAP}&ClientIp=${CLIENT_IP_NAMECHEAP}&Command=namecheap.domains.check&DomainList=${JSON.parse(
      response.choices[0].message.content as string
    ).join(",")}`
  );

  // Parsing XML response to JSON
  const json = xmljs.xml2json(data, options);

  // Returning JSON response
  return NextResponse.json({
    response: JSON.parse(json).ApiResponse.CommandResponse.DomainCheckResult,
  });
}
