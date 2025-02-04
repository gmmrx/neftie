"use client";

/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { StarIcon, EggIcon, ClockIcon } from "lucide-react";
import moment from "moment";

interface LatestHatchRowProps {
  data: {
    neftie_name: string;
    usage_count: string;
    wins: string;
    loses: string;
    win_rate: string;
    rarity: string;
    grade: string;
  };
}

const FavoriteNeftieRow: FC<LatestHatchRowProps> = ({ data }) => {
  const stars = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  const starCount = stars.indexOf(data.rarity) + 1;

  return (
    <div className="w-full mt-[0.75rem] bg-white/5 h-[5.25rem] rounded-[1rem] flex items-center px-4 gap-[0.875rem] relative cursor-pointer hover:bg-white/10 transition-all">
      <div className="absolute w-[4px] h-[29px] bg-[#21FCD5] left-0 top-[50%] -translate-y-[50%] rounded-tr-[0.5rem] rounded-br-[0.5rem]" />
      <img
        src={`/images/nefties/${data.neftie_name.toLowerCase().replace(/\s+/g, "-")}.png`}
        alt={data.neftie_name}
        className="max-w-[56px]"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <div className="font-inter font-semibold text-base">
            {data.neftie_name}
          </div>
          <div className="flex gap-[1px]">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <StarIcon
                  key={index}
                  fill={index < starCount ? "#FFD12F" : "#2c2c2c"}
                  size={15}
                  stroke={index < starCount ? "#FFD12F" : "#2c2c2c"}
                />
              ))}
          </div>
        </div>
        <div className="flex items-center font-inter text-[0.625rem] text-[#768192] gap-[1rem] mt-1">
          <div className="flex items-center gap-[3px]">
            <EggIcon size={10} /> {data.grade}
          </div>
          <div className="flex items-center gap-[3px] font-semibold">
            {data.usage_count} MATCHES
          </div>
          <div className="flex items-center gap-[3px] font-semibold">
            {data.wins} WINS
          </div>
          <div className="flex items-center gap-[3px] font-semibold">
            {data.losses} LOSSES
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteNeftieRow;
