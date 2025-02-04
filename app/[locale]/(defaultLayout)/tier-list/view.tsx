"use client";

import TierListVote from "@/components/tier-list-vote";
import WhatIsTierListBox from "@/components/what-is-tier-list";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const TierListNefties: NextPage = ({ data }) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { data: session } = useSession();

  // Ensure Nefties array is unique by `name`
  const uniqueNefties = [
    ...new Map(nefties.map((item) => [item.name, item])).values(),
  ];

  // Create a map of Tier List data
  const tierListMap = new Map(data.map((item) => [item.neftie_name, item]));

  // Merge Nefties with Tier List Data
  const mergedData = uniqueNefties.map((neftie) => {
    const tierData = tierListMap.get(neftie.name); // Match by `name`
    return {
      neftie_name: neftie.name,
      avgDamageDealt: tierData?.avgDamageDealt || null,
      kdRatio: tierData?.kdRatio || null,
      survivalRate: tierData?.survivalRate || null,
      pickRate: tierData?.pickRate || null,
      performanceScore: tierData?.performanceScore || null, // Use a low value for missing data
      image: neftie.image, // Include Neftie image for display if needed
      slug: neftie.slug, // Include slug for linking
    };
  });

  // Sort by performanceScore
  const sortedData = mergedData.sort(
    (a, b) => b.performanceScore - a.performanceScore
  );

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] max-w-[70rem] mx-auto">
      <WhatIsTierListBox />

      {session && session.user && session.user.isAuroryMember && (
        <TierListVote />
      )}
      <div className="mt-12 flex gap-4">
        <div className="pb-1 border-b-[3px] border-[#d0364f] cursor-pointer font-bold text-[#d0364f]">
          All
        </div>
        <div className="cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f]  font-bold">
          {" "}
          <Link href="/tier-list/pvp">PvP</Link>
        </div>
        <div className="cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f]  font-bold">
          {" "}
          <Link href="/tier-list/pve">PvE</Link>
        </div>
        <div className="cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f]  font-bold">
          {" "}
          <Link href="/tier-list/community">Community</Link>
        </div>
      </div>
      <div className="lg:max-h-[100%] overflow-y-auto no-scrollbar mt-8 mb-4">
        <table className="min-w-full bg-white/5 ">
          <thead className="sticky top-0 bg-[#717378]/10">
            <tr>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[14px] w-[250px]">
                Neftie
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                Overall Score
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                KD Ratio
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                Avg. Damage
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                Pick Rate
              </th>
              <th className="py-4 px-1 text-left text-[#717378] font-inter font-bold text-[12px]">
                Survival Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((data, index) => {
              if (data.performanceScore) {
                // Render row with valid data
                return (
                  <tr key={index}>
                    <td className="flex items-center gap-2 pl-2 py-4 font-inter text-white text-[14px] font-semibold">
                      <div
                        style={{
                          backgroundImage: `url(/images/nefties/${data?.neftie_name.toLowerCase().replace(" ", "-")}.png)`,
                        }}
                        className="w-[30px] h-[30px] bg-center bg-cover rounded-md"
                      />
                      {data.neftie_name}
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold text-left px-4">
                      {data.performanceScore}
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold text-left px-4">
                      {data.kdRatio}
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold text-left px-4">
                      {parseFloat(data.avgDamageDealt).toFixed(2)}
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold text-left px-4">
                      {data.pickRate}
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold text-left px-4">
                      {data.survivalRate}
                    </td>
                  </tr>
                );
              } else {
                // Render "Not sufficient data" row
                return (
                  <tr key={index}>
                    <td className="flex items-center gap-2 pl-2 py-4 font-inter text-white text-[14px] font-semibold">
                      <div
                        style={{
                          backgroundImage: `url(/images/nefties/${data?.neftie_name.toLowerCase().replace(" ", "-")}.png)`,
                        }}
                        className="w-[30px] h-[30px] bg-center bg-cover rounded-md"
                      />
                      {data.neftie_name}
                    </td>
                    <td
                      colSpan={6} // Span across all columns
                      className="font-inter text-white/50 text-[10px] font-bold text-center px-4 uppercase"
                    >
                      Not sufficient data
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="mx-auto text-center text-xs font-inter my-4 text-white/40 italic">
          All Tier List data based on NeftieGG Desktop App data.
        </div>
      </div>
    </div>
  );
};

export default TierListNefties;
