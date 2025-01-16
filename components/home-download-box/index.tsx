"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { DownloadIcon } from "lucide-react";

const HomeDownloadBox: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-black border border-#FFF/26 rounded-[0.5rem] h-[323px] relative px-[2.1875rem] py-[1.5rem] mt-4 w-[46.125rem]">
        <h1 className="font-inter font-bold text-[2rem] max-w-[19rem]">
          Rise to the Top Earn Bigger Rewards
        </h1>
        <h2 className="font-inter text-[#768192] font-normal text-[0.875rem] max-w-[15rem] mt-4">
          Level up your gameplay and maximize your rewards with the ultimate
          companion app for <strong>Seekers of Tokane</strong> players.
        </h2>
        <div className="font-inter flex items-center gap-4 w-[12.8125rem] h-[3rem] cursor-pointer mt-4 justify-center p-[2px] rounded-md bg-gradient-to-r from-[#E9213D] to-[#8B0034] group relative z-[10]">
          <div className="flex items-center gap-4 w-full h-full justify-center bg-black rounded-md text-[1.25rem] group-hover:bg-transparent">
            Download Now
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="group-hover:stroke-white transition-colors duration-300"
            >
              <defs>
                <linearGradient
                  id="gradient-stroke"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E9213D" />
                  <stop offset="100%" stopColor="#8B0034" />
                </linearGradient>
              </defs>

              <DownloadIcon
                stroke="url(#gradient-stroke)"
                size={24}
                className="stroke-[#8B0034] group-hover:stroke-white transition-colors duration-300"
              />
            </svg>
          </div>
        </div>
        <img
          src={"/images/download-box-bg.png"}
          alt="download-box-bg"
          className="w-full h-[25.3125rem] absolute max-w-[48.625rem] -right-[4rem] -top-[3.25rem] z-[0]"
        />
      </div>
    </>
  );
};

export default HomeDownloadBox;
