"use client";

import NeftieBox from "@/components/neftie-box";
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

  const TierList = (tierName, rgb) => {
    const items = data[tierName];

    if (!items) return null;
    // Calculate step decrement for opacity based on the number of items

    return (
      <div className="space-y-2">
        {items.map((item, index) => {
          const opacityValue = 1 - index * 0.1; // This will calculate the opacity from 1 to 0.1

          const selectedNeftie = nefties.find((neftie) => neftie.id === item);
          const neftieImageUrl = selectedNeftie?.image;
          return (
            <Link
              href={`/neftie/${selectedNeftie?.slug}`}
              key={item.id}
              className="bg-white"
            >
              <div
                style={{ background: `rgba(${rgb}, ${opacityValue})` }}
                className={`flex gap-2 items-center p-3 hover:bg-black bg-black`}
              >
                <div
                  style={{ backgroundImage: `url(${neftieImageUrl})` }}
                  className={`rounded-full w-[40px] h-[40px] object-cover bg-center bg-[length:170%_180%]`}
                />
                <div>
                  <div className="text-sm">{selectedNeftie?.name}</div>
                  <div className="font-thin text-xs uppercase">
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
      <div className="flex gap-2 w-full mt-6 ml-4">
        <div className="goodat border ml-1 rounded-md w-[33%] max-h-[31.25rem] overflow-x-scroll">
          <div className="bg-[#529900] p-2 text-base text-ibmplex uppercase text-white text-center">
            S Tier
          </div>
          {nefties && nefties.length > 0 && TierList("sTier", "82, 153, 0")}
        </div>
        <div className="goodat border ml-1 rounded-md w-[33%] max-h-[31.25rem] overflow-x-scroll">
          <div className="bg-[#af4f00] p-2 text-base text-ibmplex uppercase text-white text-center">
            A Tier
          </div>
          {nefties && nefties.length > 0 && TierList("aTier", "175, 79, 0")}
        </div>

        <div className="goodat border ml-1 rounded-md w-[33%] max-h-[31.25rem] overflow-x-scroll">
          <div className="bg-[#990000] p-2 text-base text-ibmplex uppercase text-white text-center">
            B Tier
          </div>
          {nefties && nefties.length > 0 && TierList("bTier", "153, 0, 0")}
        </div>
      </div>
    </div>
  );
};

export default TierListNefties;
