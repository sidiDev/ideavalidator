import { NextResponse } from "next/server";
import e from "@/dbschema/edgeql-js";
import { client } from "@/edgedb";

type Params = {
  slug: string;
};

// Handler for POST requests
export async function GET(request: Request, context: { params: Params }) {
  const { slug } = context.params;

  const query = e.select(e.Ideas, (idea) => ({
    ...e.Ideas["*"],
    topCompetitors: {
      name: true,
      link: true,
      description: true,
    },
    domainList: {
      name: true,
      domain: true,
    },
    keywords: {
      keyword: true,
      keywords: {
        text: true,
        metrics: {
          avgSearches: true,
        },
      },
    },
    redditRelatedPosts: {
      data: {
        title: true,
        subreddit: true,
        selftext: true,
        created: true,
        url: true,
      },
    },
    filter_single: e.op(idea.slug, "=", slug),
  }));

  const result = await query.run(client);

  // Returning JSON response
  return NextResponse.json({
    response: result,
  });
}
