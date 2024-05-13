"use client";

import { url } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import IdeaCard from "@/components/ui/IdeaCard";
import { IconLoading } from "@/components/icons";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type Idea = {
  id: string;
  slug: string;
  keyword: string;
  description: string;
  createdAt: Date;
};

export default function Page() {
  const { data: session } = useSession();

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      axios
        .post(`${url}/api/methods/all`, {
          userId: (session?.user as { id: string }).id,
        })
        .then(({ data }) => {
          setIdeas(data.response);
          setLoading(false);
        });
    }
  }, [session]);
  return (
    <div className="mt-20">
      <h1 className="text-4xl font-semibold">Ideas</h1>
      <div className="mt-12">
        {!isLoading ? (
          ideas.length > 0 ? (
            <ul className="divide-y">
              {ideas.map((item, idx) => (
                <IdeaCard
                  key={idx}
                  item={item}
                  ideas={ideas}
                  setIdeas={setIdeas}
                />
              ))}
            </ul>
          ) : (
            <div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <Info className="w-6 h-6 text-orange-400" />
                  <p className="text-neutral-600">
                    You don't have any ideas validated yet.{" "}
                  </p>
                </div>
                <Button size="sm">
                  <Link href="/dashboard">Validate</Link>
                </Button>
              </div>
            </div>
          )
        ) : (
          <IconLoading className="mx-auto" />
        )}
      </div>
    </div>
  );
}
