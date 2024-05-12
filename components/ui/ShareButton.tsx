"use client";
import { Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { url } from "@/lib/utils";
import { RWebShare } from "react-web-share";

export default function ShareButton({
  slug,
  title,
  text,
}: {
  slug: string;
  title: string;
  text: string;
}) {
  return (
    <div className="sticky inset-x-0 bottom-4">
      <div className="flex items-center justify-between px-1 py-1 shadow bg-white border rounded-full max-w-xs mx-auto text-sm">
        <div className="flex items-center gap-x-2 text-neutral-700 ml-2">
          <Info className="w-3.5 h-3.5 text-neutral-500" />
          Tell friends about your idea
        </div>
        <RWebShare
          data={{
            text: text,
            url: `${url}/p/${slug}`,
            title: title,
          }}
        >
          <Button
            size="sm"
            className="gap-x-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs py-2 h-7"
          >
            <Share2 className="w-3 h-3 flex-none" />
            Share
          </Button>
        </RWebShare>
      </div>
    </div>
  );
}
