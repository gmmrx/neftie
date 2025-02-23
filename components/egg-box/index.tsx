"use client";
/* eslint-disable @next/next/no-img-element */
import { EggsAttributes } from "@/models/Eggs";
import Link from "next/link";
import React, { useState, FC } from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import LatestHatchRow from "../latest-hatches/row";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const EggBox: FC<{ egg: EggsAttributes }> = ({ egg }) => {
  const { t } = useTranslation();
  if (!egg) return null;
  const url = egg.image;
  console.log("selectedegg ---> ", egg);
  const chartData = [
    { grade: "Standard", count: egg.stats.standardCount, fill: "#24aa0b" },
    { grade: "Prime", count: egg.stats.primeCount, fill: "#aa0b37" },
  ];

  const transformFoundAts = (key: string) => {
    switch (key) {
      case "mp":
        return t("translate:marketplace");
      case "exp":
        return t("translate:expeditions");
      case "land":
        return t("translate:lands");
      default:
        return t("translate:marketplace");
    }
  };

  const getUrlsForFoundAts = (key: string, eggName?: string) => {
    switch (key) {
      case "mp":
        return `https://app.aurory.io/marketplace/collection/eggs?page=1&traits=Origin%3A${eggName}`;
      case "exp":
        return "https://app.aurory.io/expeditions";
      case "land":
        return "https://app.aurory.io/seekers-of-tokane/";
      default:
        return "https://app.aurory.io/marketplace/collection/eggs";
    }
  };

  return (
    <>
      <div className="p-4 rounded-sm w-[100%] text-center transition-all relative mt-6 bg-white/5 border border-[#212121]">
        <div className="flex items-start gap-2 relative flex-col-reverse lg:flex-row justify-center">
          <div className="p-4 w-full lg:w-[300px]">
            <div className="font-semibold text-[2rem] uppercase text-center mb-4">
              {egg.name}
            </div>
            <img
              src={url}
              className={`w-[300px] h-[300px] object-contain bg-center mx-auto min-w-[30px]`}
            />
          </div>
          <div className="w-full lg:w-[calc(100%-350px)]">
            <div className="font-thin text-md text-center mt-4">
              {t(`translation:${egg.description}`)}
            </div>
            <div className="flex gap-4 font-normal flex-col rounded-sm items-center text-sm uppercase my-4 bg-white/5">
              <div className="bg-white/5 w-full p-2 text-lg font-bold">
                {t("translation:nefties")}
              </div>
              <div className="flex p-2 gap-[2rem] w-full overflow-x-scroll no-scrollbar">
                {egg.eggs &&
                  egg.eggs.length > 0 &&
                  egg.eggs.map((neftie) => {
                    const neftieCount = egg.eggs.length;
                    const singleRow = 100 / neftieCount;
                    const width = singleRow.toFixed(2) + "%";
                    return (
                      <div
                        key={neftie.name}
                        className={`w-[${width}]`}
                        style={{ width: width }}
                      >
                        <Link
                          href={`https://neftie.gg/neftie/${neftie.name.toLowerCase().replace(" ", "-")}`}
                        >
                          <img
                            src={`/images/mini-nefties/${neftie.slug}.png`}
                            className="max-w-[50px] max-h-[50px] mx-auto mb-4"
                            alt={neftie.name}
                          />
                          <span className="text-sm">{neftie.name}</span>
                          <div className="text-xs">({width})</div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex font-thin rounded-sm items-center text-xs uppercase flex-col">
              <div className="bg-white/10 w-full p-2 text-lg font-bold">
                {t("translation:obtainable_from")}
              </div>
              <div className="pb-2 flex items-center gap-4 w-full p-2 bg-white/5 justify-center">
                {egg.foundAt &&
                  egg.foundAt.length > 0 &&
                  egg.foundAt.map((foundAt) => {
                    return (
                      <div
                        key={foundAt}
                        className="font-medium bg-white/10 p-2 rounded-md "
                      >
                        <Link
                          href={getUrlsForFoundAts(foundAt, egg.name)}
                          target="_blank"
                        >
                          {transformFoundAts(foundAt)}
                        </Link>{" "}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 w-full flex justify-between">
        <div className="flex-none w-[49%]">
          <div className="bg-white/5 p-4 rounded-md border border-[#212121] w-full">
            {" "}
            <h2 className="font-inter mt-0 mb-4">Statistics</h2>
            <div>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="grade"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        <div className="flex-none w-[49%]">
          <div className="bg-white/5 p-4 rounded-md border border border-[#212121] w-full">
            <h2 className="font-inter mt-0 mb-4">Latest Hatches</h2>
            {egg.recentHatches &&
              egg.recentHatches.length > 0 &&
              egg.recentHatches.map((hatch) => (
                <LatestHatchRow key={hatch.id} hatch={hatch} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EggBox;
