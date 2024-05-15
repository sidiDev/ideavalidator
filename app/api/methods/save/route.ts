import { NextResponse } from "next/server";
import e from "@/dbschema/edgeql-js";
import { client } from "@/edgedb";
import { RedditRelatedPostDataType } from "@/components/ui/RedditRelatedPosts";
import { v4 as uuidv4 } from "uuid";
import { createSlug } from "@/lib/utils";

// Handler for POST requests
export async function POST(req: Request) {
  const data = await req.json();

  console.log(data);

  const slug = `${createSlug(data.keywords.keyword)}-${uuidv4().slice(0, 6)}`;

  const query = e.params(
    {
      userId: e.str,
      slug: e.str,
      ideaDescription: e.str,
      createdAt: e.int64,
      keywords: e.tuple({
        keyword: e.str,
        keywords: e.array(
          e.tuple({
            text: e.str,
            metrics: e.tuple({
              c: e.str,
              avgSearches: e.int64,
              cIx: e.int64,
              low: e.int64,
              high: e.int64,
              g: e.tuple({ m3: e.int64, m6: e.int64, m12: e.int64 }),
            }),
          })
        ),
      }),
      domainList: e.array(
        e.tuple({
          name: e.str,
          domain: e.str,
        })
      ),
      topCompetitors: e.array(
        e.tuple({
          link: e.str,
          name: e.str,
          description: e.str,
        })
      ),
      redditRelatedPosts: e.array(
        e.tuple({
          data: e.tuple({
            title: e.str,
            subreddit: e.str,
            selftext: e.str,
            url: e.str,
            created: e.int64,
          }),
        })
      ),
    },
    ({
      keywords,
      domainList,
      topCompetitors,
      redditRelatedPosts,
      userId,
      createdAt,
      ideaDescription,
      slug,
    }) => {
      return e.insert(e.Ideas, {
        userId,
        createdAt,
        description: ideaDescription,
        slug,
        keywords: e.insert(e.Keywords, {
          keyword: keywords.keyword,
          keywords: e.for(e.array_unpack(keywords.keywords), (kw) =>
            e.insert(e.Keyword, {
              text: kw.text,
              metrics: e.insert(e.Metrics, {
                c: kw.metrics.c,
                avgSearches: kw.metrics.avgSearches,
                cIx: kw.metrics.cIx,
                low: kw.metrics.low,
                high: kw.metrics.high,
                g: e.insert(e.Growth, {
                  m3: kw.metrics.g.m3,
                  m6: kw.metrics.g.m6,
                  m12: kw.metrics.g.m12,
                }),
              }),
            })
          ),
        }),
        domainList: e.for(e.array_unpack(domainList), (domain) =>
          e.insert(e.Domain, {
            name: domain.name,
            domain: domain.domain,
          })
        ),
        topCompetitors: e.for(e.array_unpack(topCompetitors), (competitor) =>
          e.insert(e.Competitor, {
            link: competitor.link,
            name: competitor.name,
            description: competitor.description,
          })
        ),
        redditRelatedPosts: e.for(
          e.array_unpack(redditRelatedPosts),
          (redditData) =>
            e.insert(e.RedditPost, {
              data: e.insert(e.RedditData, {
                title: redditData.data.title,
                subreddit: redditData.data.subreddit,
                selftext: redditData.data.selftext,
                created: redditData.data.created,
                url: redditData.data.url,
              }),
            })
        ),
      });
    }
  );

  await query.run(client, { ...data, createdAt: Date.now(), slug });

  // Returning JSON response
  return NextResponse.json({
    saved: true,
    slug,
  });
}

// TO reset schema: reset schema to initial ;
