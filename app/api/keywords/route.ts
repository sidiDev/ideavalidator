import axios from "axios";
import { NextResponse } from "next/server";
import { getGeoTargets, getToken } from "@/lib/serverUtils";

// Define the structure of the input data
type InputType = {
  keywordIdeaMetrics: {
    competition: string;
    monthlySearchVolumes: {
      month: string;
      year: string;
      monthlySearches: string;
    }[];
    avgMonthlySearches: string;
    competitionIndex: string;
    lowTopOfPageBidMicros: string;
    highTopOfPageBidMicros: string;
  };
  text: string;
  keywordAnnotations: Record<string, unknown>;
};

// Define the structure of the output data
type OutputType = {
  metrics: {
    c: string; // Competition
    avgSearches: number; // Average monthly searches
    cIx: number; // Competition Index
    low: number; // Low top-of-page bid in millionths of the currency unit
    high: number; // High top-of-page bid in millionths of the currency unit
    g: {
      m3: number; // Change in search volume over the last 3 months
      m6: number; // Change in search volume over the last 6 months
      m12: number; // Change in search volume over the last 12 months
    };
  };
  text: string; // Input text
};

// Function to calculate percentage change
const getChange = (input: InputType, months: number) => {
  const calculateChange = (start: number, end: number) =>
    Math.round(((end - start) / start) * 100 * 100) / 100;

  const searchVolumes = input.keywordIdeaMetrics.monthlySearchVolumes;
  const len = searchVolumes.length;
  if (len < months) return 0;

  const start = searchVolumes[len - months]?.monthlySearches;
  const end = searchVolumes[len - 1]?.monthlySearches;

  if (start == null || end == null) return 0;
  return calculateChange(parseInt(start || "0"), parseInt(end || "0"));
};

// Function to transform input data into shorter format
function makeShorter(input: InputType): OutputType {
  // Mapping of month names to their numeric representation
  const monthMapping: Record<string, number> = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  return {
    metrics: {
      c: input.keywordIdeaMetrics.competition,
      avgSearches: parseInt(input.keywordIdeaMetrics.avgMonthlySearches),
      cIx: parseInt(input.keywordIdeaMetrics.competitionIndex),
      low:
        parseInt(input.keywordIdeaMetrics.lowTopOfPageBidMicros || "0") /
        1_000_000,
      high:
        parseInt(input.keywordIdeaMetrics.highTopOfPageBidMicros || "0") /
        1_000_000,
      g: {
        m3: getChange(input, 3),
        m6: getChange(input, 6),
        m12: getChange(input, 12),
      },
    },
    text: input.text,
  };
}

// Function to handle POST requests
export async function POST(req: Request) {
  const { site, url, k, lang } = await req.json();

  // Check if required parameters are provided
  if (!site && !url && !k?.length) {
    return NextResponse.json({
      error: "Either Site, URL or Keywords required",
    });
  }

  try {
    // Get access token
    const accessToken = await getToken();
    if (!accessToken) {
      return NextResponse.json({ error: "Unable to get access token" });
    }

    // Get geo targets
    const getTargets = getGeoTargets(lang as string);
    let geoTargetConstants = getTargets.geoTargetConstants.slice(0, 10); // Maximum 10 targets

    // Remove Russia from geo targets (if exists)
    const russia = "geoTargetConstants/2643"; // Russia is banned
    if (geoTargetConstants.includes(russia)) {
      geoTargetConstants = geoTargetConstants.filter(
        (i: string) => i !== russia
      );
    }

    console.log(
      "Language:",
      getTargets.locale,
      getTargets.lang,
      getTargets.criterionId
    );
    console.log("GeoTargetConstants:", geoTargetConstants);

    // Prepare request body
    const keywordsArray = k?.length ? (Array.isArray(k) ? k : [k]) : [];
    const body: any = {
      language: `languageConstants/${getTargets.criterionId}`,
      geoTargetConstants,
    };

    // Determine seed type based on provided parameters
    if (keywordsArray.length && url) {
      body.keywordAndUrlSeed = { keywords: keywordsArray, url };
    } else if (keywordsArray.length && !url) {
      body.keywordSeed = { keywords: keywordsArray };
    } else if (url) {
      body.urlSeed = { url };
    } else if (site) {
      body.siteSeed = { site };
    }

    // Send request to Google Ads API
    const result = await axios.post(
      `https://content-googleads.googleapis.com/v15/customers/${process.env.GOOGLE_API_CUSTOMER_ID}:generateKeywordIdeas?alt=json&key=${process.env.GOOGLE_API_KEY}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "developer-token": process.env.GOOGLE_API_DEV_TOKEN,
          "login-customer-id": process.env.GOOGLE_API_CUSTOMER_ID,
        },
      }
    );

    // Extract and transform keywords data
    const keywords = ((result.data.results as any[]) || [])
      .filter((i) => !!i.keywordIdeaMetrics)
      .map((i) => makeShorter(i));

    // Return response with extracted keywords
    return NextResponse.json({ url, keywords });
  } catch (ex: any) {
    // Handle exceptions
    if (ex.response) {
      console.log("Data:", ex.response.data);
      console.log(
        "Error details:",
        JSON.stringify(ex.response.data?.error?.details || [])
      );
      console.log("Status:", ex.response.status);
      console.log("Headers:", ex.response.headers);
    } else if (ex.request) {
      console.log("Request:", ex.request);
    } else {
      console.log("Error:", ex.message);
    }

    // Return error response
    return NextResponse.json({ error: ex.message });
  }
}
