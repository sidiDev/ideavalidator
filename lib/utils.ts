import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const url =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://ideavalidator.org";

// AI_BASE_URL: https://api.perplexity.ai
// AI_BASE_URL: https://api.groq.com/openai/v1

// AI_API_KEY: PERPLEXITY_API_KEY
// AI_API_KEY: GROQ_API_KEY

// MODEL: mixtral-8x7b-32768
// MODEL: llama-3-sonar-small-32k-chat
export const AI_FIELDS = {
  API_KEY: process.env.PERPLEXITY_API_KEY || "",
  BASE_URL: "https://api.perplexity.ai",
  MODEL: "llama-3-sonar-small-32k-chat",
};

export function createSlug(title: string) {
  // Convert title to lowercase and replace spaces with dashes
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  // Remove special characters except dashes and alphanumeric characters
  return slug.replace(/[^\w-]/g, "");
}
