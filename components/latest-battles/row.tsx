"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  DownloadIcon,
  StarIcon,
  DotIcon,
  SwordsIcon,
  ClockIcon,
} from "lucide-react";

const LatestBattleRow: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-[0.75rem] bg-white/5 h-[5.25rem] rounded-[1rem] flex items-center px-4 gap-[0.875rem] relative cursor-pointer hover:bg-white/10 transition-all transition-hover">
      <div className="absolute w-[4px] h-[29px] bg-[#E9213D] left-0 top-[50%] -translate-y-[50%] rounded-tr-[0.5rem] rounded-br-[0.5rem]" />

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <img
            src={
              "https://aurorians.cdn.aurory.io/aurorians-v2/current/images/mini/2971.png"
            }
            className="max-w-[36px] rounded-[0.5rem] max-h-[36px]"
          />
          <div className="font-inter font-semibold text-base text-[#20C812] overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]">
            chocoopandaaaaaaaaaaaaaaaaaaaa
          </div>
          <div>
            <SwordsIcon />
          </div>
          <div className="font-inter font-semibold text-base text-[#E9213D] overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]">
            chocoopandaaaaaaaaaaaaaaaaaaaa
          </div>
          <img
            src={
              "https://aurorians.cdn.aurory.io/aurorians-v2/current/images/mini/2971.png"
            }
            className="max-w-[36px] rounded-[0.5rem] max-h-[36px]"
          />
        </div>

       
      </div>
    </div>
  );
};

export default LatestBattleRow;
