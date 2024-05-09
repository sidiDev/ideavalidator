"use client";
import DomainsList from "@/components/ui/DomainsList";
import { DomainCardType } from "@/components/ui/DomainsList/Card";
import FormValidate from "@/components/ui/FormValidate";
import {
  CompetitorsType,
  KeywordType,
  getDomains,
  getKeywordStats,
  getRedditRelatedPosts,
  getTopCompetitors,
} from "@/methods";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import KeywordSearchCard from "@/components/ui/KeywordSearchCard";
import TopCompetitors from "@/components/ui/TopCompetitors";
import RedditRelatedPosts, {
  RedditRelatedPostDataType,
} from "@/components/ui/RedditRelatedPosts";

export default function Dashboard() {
  const [ideaDescription, setIdeaDescription] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<{
    keywords: KeywordType[];
    keyword: string;
  }>({ keywords: [], keyword: "" });
  const [domainList, setDomainList] = useState<DomainCardType[]>([]);
  const [topCompetitors, setCompetitors] = useState<CompetitorsType[]>([]);
  const [redditRelatedPosts, setRedditRelatedPosts] = useState<
    RedditRelatedPostDataType[]
  >([]);

  const {
    completion,
    complete,
    isLoading: isAnalyzing,
  } = useCompletion({
    api: "/api/something",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await getKeywordStats({ ideaDescription, setKeywords });
    await getTopCompetitors({ ideaDescription, setCompetitors });
    // await complete(ideaDescription);
    await getDomains({ ideaDescription, setDomainList });
    await getRedditRelatedPosts({ ideaDescription, setRedditRelatedPosts });
  }

  useEffect(() => {
    if (keywords.keyword && domainList.length > 0) {
      setLoading(false);
    }
  }, [keywords, domainList]);

  return (
    <>
      <FormValidate
        submit={handleSubmit}
        value={ideaDescription}
        isLoading={isLoading}
        onInput={(e) => setIdeaDescription(e.target.value)}
      />
      <div className="space-y-12 mt-24 pb-4">
        <KeywordSearchCard
          keywords={keywords?.keywords}
          keyword={keywords?.keyword}
        />
        <div>
          <DomainsList list={domainList} />
        </div>
        <TopCompetitors list={topCompetitors} />
        <RedditRelatedPosts list={redditRelatedPosts} />
      </div>
    </>
  );
}
