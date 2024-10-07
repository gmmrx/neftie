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
      className="max-w-[300px] !p-0 cursor-pointer"
      onClick={() => window.open(`https://youtube.com/watch?v=${video.yt_url}`)}
    >
      <CardHeader className="p-0 bg-transparent border-0">
        <div className="flex flex-col items-start gap-0 relative">
          <img src={video.thumbnail} alt={video.name} className="max-w-full" />
          <div className="text-center absolute bottom-4 bg-grey w-full">
            <CardTitle className="text-center text-sm">{video.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default VideoBox;
