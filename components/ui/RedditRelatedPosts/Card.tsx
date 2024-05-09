import Link from "next/link";
import { RedditRelatedPostType } from ".";
import { Badge } from "@/components/ui/badge";
import { marked } from "marked";
import Image from "next/image";
import Reddit_Icon from "@/public/Reddit_Icon.svg";

export default function Card({
  subreddit,
  title,
  selftext,
  url,
  idx,
}: RedditRelatedPostType) {
  return (
    <li className="w-full h-full py-4 flex gap-x-3">
      <Badge
        variant="secondary"
        className="text-neutral-600 rounded-full w-7 h-7 flex-none font-medium flex items-center justify-center"
      >
        {idx}
      </Badge>
      <div className="h-full hover:group">
        <Link href={url} target="_blank">
          <h3 className="text-base text-neutral-800 hover:text-orange-600 font-medium group-hover:underline duration-200">
            {title}
          </h3>
        </Link>
        <div
          className="mt-1 text-sm line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: marked.parse(selftext).toString(),
          }}
        ></div>
        <Link
          href={`https://www.reddit.com/r/${subreddit}`}
          target="_blank"
          className="flex items-center gap-x-2 mt-3 text-sm text-orange-600"
        >
          <Image src={Reddit_Icon} alt={title} width={15} height={15} />
          {subreddit}
        </Link>
      </div>
    </li>
  );
}
