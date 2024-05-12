"use client";

import { KeywordType } from "@/methods";
import { BarChart } from "@tremor/react";
import Heading from "./Heading";

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
        showAnimation={true}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  ) : (
    <></>
  );
}
