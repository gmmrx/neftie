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

  const TierList = (tierName: string, rgb: string) => {
    const items = data[tierName];

    if (!items) return null;

    return (
      <div className="flex w-full h-full gap-2">
        {items.map((item, index) => {
          const opacityValue = 1 - index * 0.1;

          const selectedNeftie = nefties.find((neftie) => neftie.id === item);
          const neftieImageUrl = selectedNeftie?.image;
          return (
            <Link href={`/neftie/${selectedNeftie?.slug}`} key={item.id}>
              <div className={`flex gap-2 items-center p-3  h-full`}>
                <div
                  style={{ backgroundImage: `url(${neftieImageUrl})` }}
                  className={`rounded-full w-[40px] h-[40px] object-cover bg-center bg-[length:170%_180%]`}
                />
                <div>
                  <div className="text-sm">{selectedNeftie?.name}</div>
                  <div className="font-thin text-xs uppercase whitespace-nowrap">
                    {t("translation:element")}:{" "}
                    <span className="font-normal">
                      {t(
                        `translation:elements.${selectedNeftie?.element}`
                      ).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem]">
      <WhatIsTierListBox />
      <div className="my-2 text-sm ml-4 max-w-fit p-2 rounded-sm bg-secondary text-xs font-normal uppercase">
        {t("translation:current_patch")}:
        <span className="font-semibold">{CURRENT_PATCH_VERSION}</span>
      </div>
      {session && session.user && session.user.isAuroryMember && (
        <TierListVote />
      )}
      <div className="flex h-[100px] mt-6">
        <div className="w-[100px] text-center h-[100px] leading-[100px] bg-[#28a745] rounded-tl-sm rounded-bl-sm">
          S
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {nefties && nefties.length > 0 && TierList("sTier", "40, 167, 69")}
        </div>
      </div>
      <div className="flex h-[100px] mt-6">
        <div className="w-[100px] text-center h-[100px] leading-[100px] bg-[#8bc34a] rounded-tl-sm rounded-bl-sm">
          A
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {nefties && nefties.length > 0 && TierList("aTier", "40, 167, 69")}
        </div>
      </div>
      <div className="flex h-[100px] mt-6">
        <div className="w-[100px] text-center h-[100px] leading-[100px] bg-[rgb(208,186,0,1)] rounded-tl-sm rounded-bl-sm">
          B
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {nefties && nefties.length > 0 && TierList("bTier", "40, 167, 69")}
        </div>
      </div>
      <div className="flex h-[100px] mt-6">
        <div className="w-[100px] text-center h-[100px] leading-[100px] bg-[#ff9800] rounded-tl-sm rounded-bl-sm">
          C
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {nefties && nefties.length > 0 && TierList("cTier", "40, 167, 69")}
        </div>
      </div>
      <div className="flex h-[100px] mt-6">
        <div className="w-[100px] text-center h-[100px] leading-[100px] bg-[#f44336] rounded-tl-sm rounded-bl-sm">
          D
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {nefties && nefties.length > 0 && TierList("dTier", "40, 167, 69")}
        </div>
      </div>
    </div>
  );
};

export default TierListNefties;
