"use client";

import NeftieBox from "@/components/neftie-box";
import TierListVote from "@/components/tier-list-vote";
import WhatIsTierListBox from "@/components/what-is-tier-list";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const SingleTierList: NextPage = ({ data }) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { data: session } = useSession();

  const TierList = (tierName: string, rgb: string) => {
    const items = data[tierName];

    if (!items) return null;

    return (
      <div className="flex overflow-scroll w-full no-scrollbar bg-transparent bg-black">
        {items.map((item, index) => {
          const selectedNeftie = nefties.find((neftie) => neftie.id === item);
          const neftieImageUrl = selectedNeftie?.image;
          return (
            <Link
              href={`/neftie/${selectedNeftie?.slug}`}
              key={index + selectedNeftie?.name}
            >
              <div
                className={`flex gap-2 items-center h-full flex-col px-6 p-3 rounded-[100%]`}
              >
                <div
                  style={{ backgroundImage: `url(${neftieImageUrl})` }}
                  className={`rounded-full w-[70px] h-[70px] object-cover bg-center bg-[length:170%_180%]`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <Suspense>
      <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem]">
        <div className="text-center font-normal">
          List of
          <span className="text-center font-bold">
            {data?.User?.username}
          </span>{" "}
          &apos;s strongest/weakest Neftie predictions for Patch:{" "}
          {CURRENT_PATCH_VERSION}
        </div>
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
    </Suspense>
  );
};

export default SingleTierList;
