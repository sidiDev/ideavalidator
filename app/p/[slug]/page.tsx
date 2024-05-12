import DomainsList from "@/components/ui/DomainsList";
import axios from "axios";
import KeywordSearchCard from "@/components/ui/KeywordSearchCard";
import TopCompetitors from "@/components/ui/TopCompetitors";
import RedditRelatedPosts from "@/components/ui/RedditRelatedPosts";
import { url } from "@/lib/utils";
import { RedditRelatedPostData } from "@/dbschema/interfaces";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const {
    data: { response },
  } = await axios.get(`${url}/api/methods/get/${params.slug}`);

  return response ? (
    <div className="mt-20 max-w-screen-md mx-auto px-4">
      <div className="space-y-12 mt-24 pb-4">
        <KeywordSearchCard
          keywords={response.keywords}
          keyword={response.keyword}
        />
        <div>
          <DomainsList list={response.domainList} />
        </div>
        <TopCompetitors list={response.topCompetitors} />
        <RedditRelatedPosts
          list={response.redditRelatedPosts.map(
            (item: RedditRelatedPostData) => ({ data: item })
          )}
        />
      </div>
    </div>
  ) : (
    notFound()
  );
}
