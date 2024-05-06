import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "process";
import xmljs from "xml-js";

// https://ip.web-hosting.com/
export async function GET(request: Request) {
  const API_KEY_NAMECHEAP = process.env.API_KEY_NAMECHEAP;
  const USERNAME_NAMECHEAP = process.env.USERNAME_NAMECHEAP;
  const CLIENT_IP_NAMECHEAP = process.env.CLIENT_IP_NAMECHEAP;

  const options = {
    compact: true,
    ignoreAttributes: false,
  };

  const url =
    env.NODE_ENV == "development"
      ? "https://api.sandbox.namecheap.com/xml.response"
      : "https://api.namecheap.com/xml.response";

  const { data } = await axios.get(
    `${url}?ApiUser=${USERNAME_NAMECHEAP}&ApiKey=${API_KEY_NAMECHEAP}&UserName=${USERNAME_NAMECHEAP}&ClientIp=${CLIENT_IP_NAMECHEAP}&Command=namecheap.domains.getList&SearchTerm=Quirvio&PageSize100&Page=10`
  );

  const json = xmljs.xml2json(data, options);

  // console.log(JSON.parse(json).ApiResponse.CommandResponse);

  return NextResponse.json({
    domain_check_result: JSON.parse(json).ApiResponse,
  });
}
