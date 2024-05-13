import { NextResponse } from "next/server";
import e from "@/dbschema/edgeql-js";
import { client } from "@/edgedb";
import { RedditRelatedPostDataType } from "@/components/ui/RedditRelatedPosts";
import { v4 as uuidv4 } from "uuid";
import { createSlug } from "@/lib/utils";

// Handler for POST requests
export async function POST(req: Request) {
  const {
    keywords,
    domainList,
    topCompetitors,
    redditRelatedPosts,
    userId,
    ideaDescription,
  } = await req.json();

  const slug = `${createSlug(keywords.keyword)}-${uuidv4().slice(0, 6)}`;

  const query = e.insert(e.Ideas, {
    userId: userId,
    keywords: keywords.keywords,
    keyword: keywords.keyword,
    domainList: domainList,
    topCompetitors: topCompetitors,
    redditRelatedPosts: redditRelatedPosts.map(
      (item: RedditRelatedPostDataType) => ({ ...item.data })
    ),
    slug: slug,
    description: ideaDescription,
    createdAt: Date.now(),
  });

  const result = await query.run(client);

  // Returning JSON response
  return NextResponse.json({
    saved: true,
    slug,
  });
}

// TO reset schema: reset schema to initial ;
