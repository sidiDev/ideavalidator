import { CompetitorsType } from "@/methods";
import Heading from "../Heading";
import Card from "./Card";

export default function TopCompetitors({ list }: { list: CompetitorsType[] }) {
  return list.length > 0 ? (
    <div>
      <Heading className="text-lg font-semibold flex items-center gap-x-3">
        competitors
      </Heading>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {list.map((item, idx) => (
          <Card
            key={idx}
            name={item.name}
            description={item.description}
            link={item.link}
          />
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );
}
