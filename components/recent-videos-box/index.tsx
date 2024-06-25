"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import { useVideos } from "@/providers/VideosProvider";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import VideoBox from "../video-box";

const RecentVideosBox: FC = () => {
  const { t, i18n } = useTranslation();
  const { videos } = useVideos();
  return (
    <div className="p-4 rounded-sm w-full text-left mt-[5rem]">
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0 flex gap-4 items-center">
          {t("translation:recently_added_videos")}{" "}
          <img
            src={`/images/flags/${i18n.language}.svg`}
            className="w-[20px]"
            alt={i18n.language}
          />
        </h2>
        <Link href="/videos">
          <div className="cursor-pointer uppercase text-sm flex items-center gap-1 border-b pb-1 border-white">
            {t("translation:explore_all")} <ChevronRight size={14} />
          </div>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 gap-4">
        {videos &&
          videos.length > 0 &&
          videos.slice(0, 3).map((video) => {
            return <VideoBox video={video} key={video.id} />;
          })}
      </div>
    </div>
  );
};

export default RecentVideosBox;
