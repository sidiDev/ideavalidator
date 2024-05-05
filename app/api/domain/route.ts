import axios from "axios";
import { NextResponse } from "next/server";
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

  // const { data } = await axios.get(
  //   `https://api.sandbox.namecheap.com/xml.response?ApiUser=${USERNAME_NAMECHEAP}&ApiKey=${API_KEY_NAMECHEAP}&UserName=${USERNAME_NAMECHEAP}&ClientIp=${CLIENT_IP_NAMECHEAP}&Command=namecheap.domains.check&DomainList=Foundrify.com`
  // );

  const apiEndpoint = "https://api.godaddy.com/v1/domains/available";
  const apiKey = process.env.API_KEY_GODADDY;
  const apiSecret = process.env.API_SECRET_GODADDY;
  const query = "formbuilder"; // Replace with the query for which you want domain suggestions

  const headers = {
    Authorization: `sso-key ${apiKey}:${apiSecret}`,
    "Content-Type": "application/json",
  };

  // Using a try-catch block to handle potential errors
  try {
    const { data } = await axios.post(
      apiEndpoint,
      {
        domains: ["ragklabs.com"],
        // query: query,
        // type: "domain", // Specify the type of suggestion you want (domain, email, etc.)
      },
      { headers }
    );
    console.log(data); // Assuming you want to log the response
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error occurred:", error); // Logging the error message
    return NextResponse.json({ error });
  }

  // const json = xmljs.xml2json(data, options);
}
