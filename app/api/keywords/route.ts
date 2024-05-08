import axios from "axios";
import { NextResponse } from "next/server";
import { getGeoTargets, getToken } from "@/lib/serverUtils";

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

type OutputType = {
  metrics: {
    c: string;
    /*vol: {
      m: number;
      y: number;
      s: number;
    }[];*/
    avgSearches: number;
    cIx: number;
    low: number;
    high: number;
    g: {
      m3: number;
      m6: number;
      m12: number;
    };
  };
  text: string;
  // annotations: Record<string, unknown>;
};

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

function makeShorter(input: InputType): OutputType {
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
      /*vol: input.keywordIdeaMetrics.monthlySearchVolumes.map((msv) => ({
        m: monthMapping[msv.month],
        y: parseInt(msv.year),
        s: parseInt(msv.monthlySearches),
      })),*/
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
    // annotations: input.keywordAnnotations,
  };
}

export async function POST(req: Request) {
  const { site, url, k, lang } = await req.json();

  if (!site && !url && !k?.length) {
    return NextResponse.json({
      error: "Either Site, URL or Keywords required",
    });
  }

  try {
    const accessToken = await getToken();
    if (!accessToken) {
      return NextResponse.json({ error: "Unable to get acccess token" });
    }

    // console.log('accessToken', accessToken);

    const getTargets = getGeoTargets(lang as string);
    let geoTargetConstants = getTargets.geoTargetConstants.slice(0, 10); // max 10

    const russia = "geoTargetConstants/2643"; // Russia is banned
    if (geoTargetConstants.includes(russia)) {
      geoTargetConstants = geoTargetConstants.filter(
        (i: string) => i !== russia
      );
    }

    console.log(
      "language",
      getTargets.locale,
      getTargets.lang,
      getTargets.criterionId
    );
    console.log("geoTargetConstants", geoTargetConstants);

    const keywordsArray = k?.length ? (Array.isArray(k) ? k : [k]) : [];
    const body: any = {
      language: `languageConstants/${getTargets.criterionId}`,
      geoTargetConstants,
    };

    if (keywordsArray.length && url) {
      body.keywordAndUrlSeed = { keywords: keywordsArray, url };
    } else if (keywordsArray.length && !url) {
      body.keywordSeed = { keywords: keywordsArray };
    } else if (url) {
      body.urlSeed = { url };
    } else if (site) {
      body.siteSeed = { site };
    }

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

    const keywords = ((result.data.results as any[]) || [])
      .filter((i) => !!i.keywordIdeaMetrics)
      .map((i) => makeShorter(i));

    return NextResponse.json({ url, keywords });
  } catch (ex: any) {
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

    return NextResponse.json({ error: ex.message });
  }
}
