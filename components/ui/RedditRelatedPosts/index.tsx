import { useState } from "react";
import Heading from "../Heading";
import { Button } from "../button";
import Card from "./Card";

export type RedditRelatedPostType = {
  subreddit: string;
  title: string;
  selftext: string;
  url: string;
  idx?: number;
};

export type RedditRelatedPostDataType = {
  data: {
    subreddit: string;
    title: string;
    selftext: string;
    url: string;
  };
};

export default function RedditRelatedPosts({
  list,
}: {
  list: RedditRelatedPostDataType[];
}) {
  const [limit, setLimit] = useState(3);
  return list.length > 0 ? (
    <div>
      <Heading>Related posts about your idea from Reddit</Heading>
      <ul className="mt-6 divide-y space--y-6">
        {list.slice(0, limit).map((item, idx) => (
          <Card
            key={idx}
            idx={idx + 1}
            subreddit={item.data.subreddit}
            title={item.data.title}
            selftext={item.data.selftext}
            url={item.data.url}
          />
        ))}
      </ul>
      <div className="text-center">
        {limit != list.length ? (
          <Button variant="outline" onClick={() => setLimit(list.length)}>
            Show more
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}
