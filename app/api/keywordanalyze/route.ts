import { url } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

// For getting your IP address: https://ip.web-hosting.com

// Handler for POST requests
export async function POST(request: Request) {
  // Extracting idea description from request body
  const { ideaDescription } = await request.json();

  // This will generate the keyword based on the ideaDescription
  const {
    data: { keyword },
  } = await axios.post(`${url}/api/generatekeyword`, { ideaDescription });

  // Pass the keyword to our new route /api/keywords to get some information about the keyword like: monthly search ...etc
  const {
    data: { keywords },
  } = await axios.post(`${url}/api/keywords`, {
    k: keyword,
  });

  return NextResponse.json({
    keywords: keywords.slice(0, 5),
    keyword,
  });
}
