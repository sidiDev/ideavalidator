"use client";
import { Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";
import { url } from "@/lib/utils";

export default function ShareButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  function shareIdea() {
    // Fallback, Tries to use API only
    // if navigator.share function is
    // available
    if (navigator.share) {
      navigator
        .share({
          // Title that occurs over
          // web share dialog
          title: title,

          // URL to share
          url: `${url}/p/${slug}`,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => {
          // Handle errors, if occurred
          console.log("Error while using Web share API:");
          console.log(err);
        });
    } else {
      // Alerts user if API not available
      alert("Browser doesn't support this share method !");
    }
  }
  return (
    <div className="sticky inset-x-0 bottom-4">
      <div className="flex items-center justify-between px-1 py-1 shadow bg-white border rounded-full max-w-xs mx-auto text-sm">
        <div className="flex items-center gap-x-2 text-neutral-700 ml-2">
          <Info className="w-3.5 h-3.5 text-neutral-500" />
          Tell friends about your idea
        </div>
        <Button
          onClick={shareIdea}
          size="sm"
          className="gap-x-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs py-2 h-7"
        >
          <Share2 className="w-3 h-3 flex-none" />
          Share
        </Button>
      </div>
    </div>
  );
}
