import { NextResponse } from "next/server";

// Handler for POST requests
export async function GET(request: Request) {
  // Returning JSON response
  return NextResponse.json({
    response: true,
  });
}
