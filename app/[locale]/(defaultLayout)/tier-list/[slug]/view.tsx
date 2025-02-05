"use client";

import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import { format } from "date-fns";
import { EyeIcon, Vote, VoteIcon } from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const SingleTierList: NextPage = ({ data }) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { data: session } = useSession();
  console.log(data);
  const TierList = (tier) => {
    if (!tier?.items || tier.items.length === 0) return null;

    return (
      <div className="flex h-[100px] mt-6">
        <div
          className="w-[100px] text-center h-[100px] leading-[100px] rounded-tl-sm rounded-bl-sm"
          style={{ backgroundColor: tier.color }}
        >
          {tier.name}
        </div>
        <div className="w-[calc(100%-100px)] h-[100px] flex overflow-scroll no-scrollbar bg-[#242424] rounded-tr-sm rounded-br-sm">
          {tier.items.map((item, index) => {
            const selectedNeftie = nefties.find(
              (neftie) => neftie.id === item.neftieId
            );
            const neftieImageUrl = selectedNeftie?.image;

            return (
              <Link href={`/neftie/${selectedNeftie?.slug}`} key={index}>
                <div className="flex gap-2 items-center h-full flex-col px-6 p-3 rounded-full">
                  <div
                    style={{
                      backgroundImage: `url('/images/nefties/${selectedNeftie?.slug}.png`,
                    }}
                    className="rounded-full w-[70px] h-[70px] bg-center bg-cover"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-left pt-10 text-xl font-semibold mx-auto flex justify-between">
        <div className="flex gap-4">
          <img
            src={
              "https://cdn.discordapp.com/avatars/893148670378270720/331402df89491abb17960dce8264321a.png"
            }
            className="max-w-[100px] max-h-[100px] object-cover rounded-sm"
          />
          <div>
            <div className="text-[28px]">{data?.title}</div>
            <div className="text-[12px] mt-0 font-thin font-inter flex items-center gap-1 text-[#bdbdbd]">
              by:
              <span className="text-red font-semibold">
                {data?.User.username}
              </span>
              <div className="text-[12px] mt-0 font-thin font-inter flex items-center gap-1">
                posted at:{" "}
                <span className="text-red font-semibold">
                  {format(data?.createdAt, "dd MMM yyy")}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-xs mt-1 font-thin font-inter">
                <span className="text-xs flex items-center gap-2 font-semibold">
                  <EyeIcon className="max-w-[16px]" />
                  {data?.viewCount}
                </span>
              </div>
              <div className="text-xs mt-1 font-thin font-inter">
                <span className="text-xs flex items-center gap-2 font-semibold">
                  <VoteIcon className="max-w-[16px]" />
                  {data?.voteCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-1 text-xs">PATCH: {CURRENT_PATCH_VERSION}</div>
      </div>
      <div className="w-full p-2 bg-white/5 mt-4 rounded-md">
        <span className="font-inter text-[15px] font-thin">DESCRIPTION:</span>{" "}
        {data?.description}
      </div>
      {data.tiers.map((tier) => (
        <TierList key={tier.id} {...tier} />
      ))}
    </div>
  );
};

export default SingleTierList;
