"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import { VideoAttributes } from "@/models/Videos";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, FC } from "react";
import { useTranslation } from "react-i18next";

const VideoBox: FC<{ video: VideoAttributes }> = ({ video }) => {
  const { t } = useTranslation();
  if (!video) return null;

  return (
    <Card
      className="max-w-[300px] cursor-pointer"
      onClick={() => window.open(`https://youtube.com/watch?v=${video.yt_url}`)}
    >
      <CardHeader>
        <div className="flex flex-col items-start gap-4">
          <img src={video.thumbnail} alt={video.name} className="max-w-full" />
          <div>
            <CardTitle>{video.name}</CardTitle>
            <CardDescription className="mt-4 flex gap-2">
              {t("translation:language")}:{" "}
              <img
                src={`/images/flags/${video.locale}.svg`}
                className="w-[20px] mr-2"
                alt={"video locale"}
              />
              {t("translation:category")}:{" "}
              {t(
                `translation:video_categories.${video.VideoCategories[0].name}`
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default VideoBox;
