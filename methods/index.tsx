import axios from "axios";
import { DomainType } from "@/components/ui/DomainsList/Card";
import {
  RedditRelatedPostDataType,
  RedditRelatedPostType,
} from "@/components/ui/RedditRelatedPosts";

export type KeywordType = {
  text: string;
  metrics: {
    avgSearches: number;
    c: string;
    cIx: number;
    g: {
      m3: number;
      m6: number;
      m12: number;
    };
    high: number;
    low: number;
    text: string;
  };
};

export type CompetitorsType = {
  link: string;
  name: string;
  description: string;
};

// A method to generate domains and check them from Namecheap
export function getDomains({
  ideaDescription,
  setDomainList,
}: {
  ideaDescription: string;
  setDomainList: (data: DomainType[]) => void;
}) {
  axios
    .post("api/domain", { ideaDescription })
    .then(({ data: { response } }: { data: { response: DomainType[] } }) => {
      const filterResponses = response.slice(0, 5);
      setDomainList(filterResponses);
    });
}

// Get keywords monthly search and other stats related to
export function getKeywordStats({
  ideaDescription,
  setKeywords,
}: {
  ideaDescription: string;
  setKeywords: (data: { keywords: KeywordType[]; keyword: string }) => void;
}) {
  axios.post("api/keywordanalyze", { ideaDescription }).then(({ data }) => {
    setKeywords(data);
  });
}

// Get top 5 competitors
export function getTopCompetitors({
  ideaDescription,
  setCompetitors,
}: {
  ideaDescription: string;
  setCompetitors: (data: CompetitorsType[]) => void;
}) {
  axios.post("api/competitors", { ideaDescription }).then(({ data }) => {
    setCompetitors(data);
  });
}

// Get related posts from Reddit
export async function getRedditRelatedPosts({
  ideaDescription,
  setRedditRelatedPosts,
}: {
  ideaDescription: string;
  setRedditRelatedPosts: (data: RedditRelatedPostDataType[]) => void;
}) {
  const {
    data: { keyword },
  } = await axios.post("api/generatekeyword", {
    ideaDescription,
  });
  console.log(keyword);
  axios
    .get(`https://www.reddit.com/search.json?q=${keyword}`)
    .then(({ data }) => {
      const children = data.data.children.map(
        ({ data: item }: { data: RedditRelatedPostType }) => ({
          data: {
            title: item.title,
            subreddit: item.subreddit,
            selftext: item.selftext,
            url: item.url,
            created: item.created,
          },
        })
      );
      setRedditRelatedPosts(children);
    });
}
