import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const url =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://ideavalidator.org";

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
