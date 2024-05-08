// Importing required modules
import axios from "axios";
import * as crypto from "crypto";
import ISO6391 from "iso-639-1";

// Importing geo target constants from a JSON file
import geoTargetConstants from "@/geoTargetConstants.json";

// Function to retrieve access token
export async function getToken() {
  // Retrieving private key, client email, and required scopes from environment variables
  const privateKey = (process.env.GOOGLE_API_PRIVATE_KEY as string)
    .split(String.raw`\n`)
    .join("\n");
  const clientEmail = process.env.GOOGLE_API_CLIENT_EMAIL;
  const scopes: string[] = ["https://www.googleapis.com/auth/adwords"];
  const tokenUrl = "https://oauth2.googleapis.com/token";

  // Constructing JWT token claims
  const header = { alg: "RS256", typ: "JWT" };
  const now: number = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    sub: process.env.GOOGLE_API_TOKEN_CLAIM_CUB,
    scope: scopes.join(" "),
    aud: tokenUrl,
    exp: (now + 3600).toString(),
    iat: now.toString(),
  };

  // Generating JWT token
  const signature: string =
    Buffer.from(JSON.stringify(header)).toString("base64") +
    "." +
    Buffer.from(JSON.stringify(claim)).toString("base64");
  const sign: crypto.Sign = crypto.createSign("RSA-SHA256");
  sign.update(signature);
  const jwt: string = signature + "." + sign.sign(privateKey, "base64");

  // Requesting access token from Google OAuth2 endpoint
  const tokenResp = await axios.post(tokenUrl, {
    assertion: jwt,
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
  });

  return tokenResp.data.access_token;
}

// Function to retrieve geo targets based on language
export function getGeoTargets(lang: string) {
  // Retrieving language code from ISO-639-1 library or defaulting to English
  const language = lang || "English";
  const locale = ISO6391.getCode(language) || "en";

  // Retrieving geo target constants for the specified locale
  const locales: any = geoTargetConstants;
  return locales[locale] || locales["en"];
}

// Function to retrieve geo target constants for a specific locale and language
export async function getGeoTargetConstants(locale: string, lang?: string) {
  // Retrieving access token for Google APIs
  const accessToken = await getToken();
  const locationNames = { names: [] };
  let geoTargetConstants = [];

  // Determining language from locale, handling specific cases like Slovenian
  let language = lang || ISO6391.getName(locale);
  if (language === "Slovenian") {
    language = "Slovene";
  }

  // Retrieving country names based on language from external API
  const apiUrl = `https://restcountries.com/v3.1/lang/${language}`;
  const countries = (await axios.get(apiUrl)).data;
  const countryNames = countries
    .sort((a: any, b: any) => b.population - a.population)
    .map((i: any) => i.name.common);
  locationNames.names = countryNames.slice(0, 25); // max 25

  // Retrieving geo target suggestions from Google Ads API
  const geoSuggestions = await axios.post(
    `https://content-googleads.googleapis.com/v15/geoTargetConstants:suggest?alt=json&key=${process.env.GOOGLE_API_KEY}`,
    {
      locale: locale,
      locationNames: locationNames,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "developer-token": process.env.GOOGLE_API_DEV_TOKEN,
        "login-customer-id": process.env.GOOGLE_API_CUSTOMER_ID,
      },
    }
  );

  // Filtering and mapping geo target constant suggestions
  const suggestions = geoSuggestions.data.geoTargetConstantSuggestions
    .filter((i: any) => i.geoTargetConstant.targetType === "Country")
    .map((i: any) => ({
      country: i.geoTargetConstant.canonicalName,
      resourceName: i.geoTargetConstant.resourceName,
    }));

  geoTargetConstants = suggestions.map((i: any) => i.resourceName);
  return {
    locale,
    suggestions,
    geoTargetConstants,
  };
}
