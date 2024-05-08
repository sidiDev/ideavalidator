import { CompetitorsType } from "@/methods";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default ({ link, name, description }: CompetitorsType) => (
  <li className="text-sm first-line:flex- gap-x-4 rounded-xl border border-neutral-400 shadow-sm overflow-hidden py-3 px-4 bg-neutral-800 hover:bg-neutral-700 duration-200">
    <Link href={link} target="_blank" className="space-y-2 group">
      <div>
        <div className="flex items-center gap-x-3">
          <img
            src={`https://www.google.com/s2/favicons?domain=${
              new URL(link).hostname
            }`}
            alt={name}
            className="flex-none"
          />
          <h4 className="flex items-center gap-x-2 text-neutral-50 font-semibold">
            {name}
            <ExternalLink className="w-3 h-3 hidden group-hover:block" />
          </h4>
        </div>
        <p className="mt-3 text-xs line-clamp-2 text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  </li>
);
