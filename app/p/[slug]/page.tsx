import DomainsList from "@/components/ui/DomainsList";
import axios from "axios";
import KeywordSearchCard from "@/components/ui/KeywordSearchCard";
import TopCompetitors from "@/components/ui/TopCompetitors";
import RedditRelatedPosts, {
  RedditRelatedPostDataType,
} from "@/components/ui/RedditRelatedPosts";
import { url } from "@/lib/utils";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar/Navbar";
import ShareButton from "@/components/ui/ShareButton";

type Params = { params: { slug: string } };
export async function generateMetadata({ params }: Params) {
  const {
    data: { response },
  } = await axios.get(`${url}/api/methods/get/${params.slug}`);

  const title = response ? `${response.keywords.keyword} - Idea validator` : "";
  const description = response ? response.description : "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Page({ params }: Params) {
  const {
    data: { response },
  } = await axios.get(`${url}/api/methods/get/${params.slug}`);

  return response ? (
    <>
      <Navbar className="border-b" />
      <div className="text-center max-w-xl mx-auto">
        <h1 className="mt-20 text-4xl font-semibold">
          Learn More About This Idea
        </h1>
        <p className="mt-2 text-neutral-600">{response.description}</p>
      </div>
      <div className="mt-12 max-w-screen-md mx-auto px-4">
        <div className="space-y-12 mt-24 pb-12">
          <KeywordSearchCard
            keywords={response.keywords.keywords}
            keyword={response.keywords.keyword}
          />
          <div>
            <DomainsList list={response.domainList} />
          </div>
          <TopCompetitors list={response.topCompetitors} />
          <RedditRelatedPosts list={response.redditRelatedPosts} />
        </div>
        <ShareButton
          slug={response.slug}
          title={response.keyword}
          text={response.description}
        />
      </div>
    </>
  ) : (
    notFound()
  );
}
