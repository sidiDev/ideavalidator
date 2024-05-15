import { NextResponse } from "next/server";
import e from "@/dbschema/edgeql-js";
import { client } from "@/edgedb";

const Ideas = {
  keywords: {
    keywords: [
      {
        metrics: {
          c: "erge",
          avgSearches: 0,
          cIx: 0,
          low: 0,
          high: 0,
          g: {
            m3: 0,
            m6: 0,
            m12: 0,
          },
        },
        text: "gdfh",
      },
      {
        metrics: {
          c: "dfsdgfsgdf",
          avgSearches: 0,
          cIx: 0,
          low: 0,
          high: 0,
          g: {
            m3: 0,
            m6: 0,
            m12: 0,
          },
        },
        text: "ykgkjg",
      },
    ],
    keyword: "gsfdg",
  },
  domainList: [
    {
      name: "gsd",
      domain: "sdgsd",
      available: false,
      isPremiumName: false,
    },
    {
      name: "ytuy",
      domain: "tuytu",
      available: false,
      isPremiumName: false,
    },
  ],
  topCompetitors: [
    {
      link: "sgsdg",
      name: "sdgsd",
      description: "sdg",
    },
    {
      link: "sgsdg",
      name: "sdgsd",
      description: "sdg",
    },
  ],
  redditRelatedPosts: [
    {
      data: {
        title: "sdg",
        subreddit: "sgsd",
        selftext: "sdg",
        created: 0,
        selftext_html: "afdf",
        url: "dfds",
      },
    },
    {
      data: {
        title: "sdg",
        subreddit: "sgsd",
        selftext: "sdg",
        created: 0,
        selftext_html: "sfdf",
        url: "dfds",
      },
    },
  ],
};

// Handler for POST requests
export async function GET(request: Request) {
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
          available: e.bool,
          isPremiumName: e.bool,
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
            selftext_html: e.str,
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
                selftext_html: redditData.data.selftext_html,
              }),
            })
        ),
      });
    }
  );

  await query.run(client, {
    ...Ideas,
    userId: "sdtgsg",
    createdAt: Date.now(),
    ideaDescription: "sdafhjgdhgs",
    slug: "ad-fsdgd-gdsfgfdgh",
  });
  // Returning JSON response
  return NextResponse.json({
    response: "",
  });
}
