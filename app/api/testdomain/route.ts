import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "process";
import xmljs from "xml-js";
const url = require("url");
const fixieUrl = url.parse(process.env.FIXIE_URL);
const fixieAuth = fixieUrl.auth.split(":");
// For getting your IP address: https://ip.web-hosting.com

// Retrieving environment variables for Namecheap API authentication
const API_KEY_NAMECHEAP = process.env.API_KEY_NAMECHEAP;
const USERNAME_NAMECHEAP = process.env.USERNAME_NAMECHEAP;
const CLIENT_IP_NAMECHEAP = process.env.CLIENT_IP_NAMECHEAP;

// Handler for POST requests
export async function GET(request: Request) {
  // Configuring options for XML parsing
  const options = {
    compact: true,
    ignoreAttributes: false,
  };

  axios
    .get("https://example.com", {
      proxy: {
        protocol: "http",
        host: fixieUrl.hostname,
        port: fixieUrl.port,
        auth: { username: fixieAuth[0], password: fixieAuth[1] },
      },
    })
    .then((response) => {
      console.log(response.status);
    });

  // Determining API URL based on environment
  const url =
    env.NODE_ENV == "development"
      ? "https://api.sandbox.namecheap.com/xml.response"
      : "https://api.namecheap.com/xml.response";

  // Making request to Namecheap API to check domain availability
  const { data } = await axios.get(
    `${url}?ApiUser=${USERNAME_NAMECHEAP}&ApiKey=${API_KEY_NAMECHEAP}&UserName=${USERNAME_NAMECHEAP}&ClientIp=${CLIENT_IP_NAMECHEAP}&Command=namecheap.domains.check&DomainList=laravelsdf.co`
  );

  // Parsing XML response to JSON
  const json = xmljs.xml2json(data, options);

  // Returning JSON response
  return NextResponse.json({
    response: JSON.parse(json).ApiResponse,
  });
}
