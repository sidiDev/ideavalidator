import { KeywordType } from "@/methods";
import { BarChart } from "@tremor/react";
import Heading from "./Heading";

// const chartdata = [
//   {
//     name: "Amphibians",
//     "Number of threatened species": 2488,
//   },
//   {
//     name: "Birds",
//     "Number of threatened species": 1445,
//   },
//   {
//     name: "Crustaceans",
//     "Number of threatened species": 743,
//   },
//   {
//     name: "Ferns",
//     "Number of threatened species": 281,
//   },
//   {
//     name: "Arachnids",
//     "Number of threatened species": 251,
//   },
//   {
//     name: "Corals",
//     "Number of threatened species": 232,
//   },
//   {
//     name: "Algae",
//     "Number of threatened species": 98,
//   },
// ];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function KeywordSearchCard({
  keywords,
  keyword,
}: {
  keywords: KeywordType[];
  keyword: string;
}) {
  const chartdata = keywords
    .map((item) => ({
      name: item.text,
      ["monthly search"]: item.metrics.avgSearches,
    }))
    .sort((a, b) => b["monthly search"] - a["monthly search"]);
  return keyword ? (
    <>
      <Heading>
        Monthly search for: <span className="text-neutral-600">{keyword}</span>
      </Heading>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={["monthly search"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  ) : (
    <></>
  );
}
