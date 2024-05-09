import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "process";
import xmljs from "xml-js";

// For getting your IP address: https://ip.web-hosting.com

// Handler for POST requests
export async function GET(request: Request) {
  // Configuring options for XML parsing
  const options = {
    compact: true,
    ignoreAttributes: false,
  };

  // Making request to Namecheap API to check domain availability
  const ApiUrl =
    process.env.NODE_ENV == "development" ? "http://localhost:8000" : "";
  const { data } = await axios.post(`${ApiUrl}/domain`, { domain: "form.com" });

  // Parsing XML response to JSON
  const json = xmljs.xml2json(data, options);

  // Returning JSON response
  return NextResponse.json({
    response: JSON.parse(json).ApiResponse,
  });
}
