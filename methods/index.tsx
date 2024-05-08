import axios from "axios";
import { DomainCardType } from "@/components/ui/DomainsList/Card";

type DomainResponseType = {
  _attributes: {
    Available: string;
    IsPremiumName: string;
    Domain: string;
  };
};

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
  setDomainList: (data: DomainCardType[]) => void;
}) {
  axios
    .post("api/domain", { ideaDescription })
    .then(
      ({
        data: { response },
      }: {
        data: { response: DomainResponseType[] };
      }) => {
        const filterResponses = response
          .map((item) => ({
            name: item._attributes.Domain.replace(/\..*/, ""),
            domain: item._attributes.Domain,
            available: JSON.parse(item._attributes.Available),
            isPremiumName: JSON.parse(item._attributes.IsPremiumName),
          }))
          .filter((item) => item.available && !item.isPremiumName)
          .slice(0, 3);
        setDomainList(filterResponses);
      }
    );
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
