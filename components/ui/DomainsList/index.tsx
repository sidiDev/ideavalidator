"use client";

import Heading from "../Heading";
import Card, { DomainType } from "./Card";

export default function DomainsList({ list }: { list: DomainType[] }) {
  return list.length > 0 ? (
    <div>
      <Heading className="text-lg font-semibold flex items-center gap-x-3">
        Domains available
      </Heading>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item, idx) => (
          <Card key={idx} name={item.name} domain={item.domain} />
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
}
