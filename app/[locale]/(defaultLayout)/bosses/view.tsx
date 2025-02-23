"use client";

import BossCard from "@/components/boss-card";
import MatchHistoryBox from "@/components/match-history-box";
import NeftieBox from "@/components/neftie-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ElementList } from "@/lib/data/elements";
import { useBosses } from "@/providers/BossesProvider";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const sortOptions = [
  { value: "name_asc", label: "Name ASC" },
  { value: "name_desc", label: "Name DESC" },
  { value: "date_asc", label: "Creation Date ASC" },
  { value: "date_desc", label: "Creation Date DESC" },
];

const ListBosses: NextPage = () => {
  const { t } = useTranslation();
  const { bosses } = useBosses();

  const [selectedPage, setSelectedPage] = useState("elites");
  const [selectedElite, setSelectedElite] = useState(bosses.ELITE[0]);

  const [selectedBoss, setSelectedBoss] = useState(bosses.BOSS[0]);
  console.log("bosses ---> ", bosses)
  useEffect(() => {
    if (bosses.ELITE.length > 0 && !selectedElite)
      setSelectedElite(bosses.ELITE[0]);
    if (bosses.BOSS.length > 0 && !selectedBoss)
      setSelectedBoss(bosses.BOSS[0]);
  }, [bosses, selectedElite]);

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] mx-auto max-w-[70rem]">
      <div className="rounded-sm w-full text-left">
        <div className="flex items-center gap-4 mb-2">
          <h2
            className={`scroll-m-20 pb-1 text-[36px] font-normal tracking-tight text-gray-400 cursor-pointer first:mt-0  ${selectedPage === "elites" ? "text-white border-b border-white" : "hover:text-white hover:underline"}`}
            onClick={() => setSelectedPage("elites")}
          >
            <strong className="">{t("translation:elites")}</strong>
          </h2>

          <h2
            className={`scroll-m-20 pb-1 text-[36px] font-normal tracking-tight text-gray-400 cursor-pointer first:mt-0 ${selectedPage === "bosses" ? "text-white border-b border-white" : "hover:text-white hover:border-b hover:border-white"}`}
            onClick={() => setSelectedPage("bosses")}
          >
            <strong className="">{t("translation:bosses")}</strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-0">
          {selectedPage === "elites"
            ? t("translation:elites_desc")
            : t("translation:bosses_desc")}
        </h3>
      </div>
      {selectedPage === "elites" ? (
        <>
          <aside className="bg-white/5 flex overflow-y-hidden overflow-x-scroll rounded-md flex-row no-scrollbar flex-grow w-[100%] max-h-[100px] mt-8 border border-[#212121]">
            {bosses &&
              bosses.ELITE &&
              bosses.ELITE.length > 0 &&
              bosses.ELITE.map((boss) => {
                return (
                  <div
                    className={`flex flex-col items-center gap-2 justify-center cursor-pointer p-4 max-h-[100px] px-6 group hover:bg-black ${selectedElite?.name === boss?.name && "bg-black"}`}
                    key={boss.name}
                    onClick={() => setSelectedElite(boss)}
                  >
                    <img
                      src={`/images/bosses/${boss.name.toLowerCase().replaceAll(" ", "-")}.png`}
                      className={`max-w-[80px] max-h-[80px] opacity-50 group-hover:opacity-100  ${selectedElite?.name === boss?.name && "!opacity-100"}`}
                    />
                  </div>
                );
              })}
          </aside>
          <div className="flex flex-wrap gap-12 justify-between">
            {selectedElite && selectedElite?.name && (
              <>
                <BossCard boss={selectedElite} />
                <div className="mt-0 w-full">
                  <div className="text-xl">Latest Battles</div>
                  {selectedElite.latestBattles &&
                    selectedElite.latestBattles.length > 0 &&
                    selectedElite.latestBattles.map((battle) => (
                      <MatchHistoryBox key={battle.id} match={battle} />
                    ))}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <aside className="bg-white/5 flex overflow-y-hidden overflow-x-scroll rounded-md flex-row no-scrollbar flex-grow w-[100%] max-h-[100px] mt-8 border border-[#212121]">
            {bosses &&
              bosses.BOSS &&
              bosses.BOSS.length > 0 &&
              bosses.BOSS.map((boss) => {
                return (
                  <div
                    className={`flex flex-col items-center gap-2 justify-center cursor-pointer p-4 max-h-[100px] px-6 group hover:bg-black ${selectedBoss?.name === boss?.name && "bg-black"}`}
                    key={boss.name}
                    onClick={() => setSelectedBoss(boss)}
                  >
                    <img
                      src={`/images/bosses/${boss.name.toLowerCase().replaceAll(" ", "-")}.png`}
                      className={`max-w-[80px] max-h-[80px] opacity-50 group-hover:opacity-100  ${selectedBoss?.name === boss?.name && "!opacity-100"}`}
                    />
                  </div>
                );
              })}
          </aside>
          <div className="flex flex-wrap gap-12 justify-between ">
            {selectedBoss && selectedBoss?.name && (
              <>
                <BossCard boss={selectedBoss} />
                <div className="mt-0 w-full">
                  <div className="text-xl">Latest Battles</div>
                  {selectedBoss.latestBattles &&
                    selectedBoss.latestBattles.length > 0 &&
                    selectedBoss.latestBattles.map((battle) => (
                      <MatchHistoryBox key={battle.id} match={battle} />
                    ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListBosses;
