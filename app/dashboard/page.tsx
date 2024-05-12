"use client";
import DomainsList from "@/components/ui/DomainsList";
import { DomainType } from "@/components/ui/DomainsList/Card";
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
import KeywordSearchCard from "@/components/ui/KeywordSearchCard";
import TopCompetitors from "@/components/ui/TopCompetitors";
import RedditRelatedPosts, {
  RedditRelatedPostDataType,
} from "@/components/ui/RedditRelatedPosts";
import SaveButton from "@/components/ui/SaveButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  const [ideaDescription, setIdeaDescription] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSaveLoading, setSaveLoading] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<{
    keywords: KeywordType[];
    keyword: string;
  }>({ keywords: [], keyword: "" });
  const [domainList, setDomainList] = useState<DomainType[]>([]);
  const [topCompetitors, setCompetitors] = useState<CompetitorsType[]>([]);
  const [redditRelatedPosts, setRedditRelatedPosts] = useState<
    RedditRelatedPostDataType[]
  >([]);

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await getKeywordStats({ ideaDescription, setKeywords });
    await getTopCompetitors({ ideaDescription, setCompetitors });
    // await complete(ideaDescription);
    await getDomains({ ideaDescription, setDomainList });
    await getRedditRelatedPosts({ ideaDescription, setRedditRelatedPosts });
  }

  async function saveIdea() {
    setSaveLoading(true);
    const { data } = await axios.post("/api/methods/save", {
      keywords,
      domainList,
      topCompetitors,
      redditRelatedPosts,
      userId: (session?.user as { id: string }).id,
      ideaDescription,
    });

    if (data.saved) {
      router.push(`/p/${data.slug}`);
      setSaveLoading(false);
    }
  }

  useEffect(() => {
    if (
      keywords.keyword &&
      domainList.length > 0 &&
      topCompetitors.length > 0 &&
      redditRelatedPosts.length > 0
    ) {
      setLoading(false);
      setShowSave(true);
    }
  }, [keywords, domainList, topCompetitors, redditRelatedPosts]);

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
        {showSave ? (
          <SaveButton onSave={saveIdea} isLoading={isSaveLoading} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
