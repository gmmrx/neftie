"use client";

import PostNewVideo from "@/components/post-new-video";
import VideoBox from "@/components/video-box";
import { useVideos } from "@/providers/VideosProvider";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const tutorialCategories = [
  {
    category: "Getting Started",
    tutorials: [
      {
        id: 1,
        name: "How to Create an Aurory Account?",
        description: "",
        yt_url: "QY3b_jSYzJE",
        is_official: false,
        is_for_children: true,
        locale: "en",
        status: "APPROVED",
        user_id: 1,
        thumbnail: "https://i.ytimg.com/vi/QY3b_jSYzJE/hqdefault.jpg",
      },
      {
        id: 2,
        name: "Hatch your Starter Egg and Start Playing!",
        description: "",
        yt_url: "2HfnoekBnqY",
        is_official: false,
        is_for_children: true,
        locale: "en",
        status: "APPROVED",
        user_id: 1,
        thumbnail: "https://i.ytimg.com/vi/2HfnoekBnqY/hqdefault.jpg",
      },
    ],
  },
  {
    category: "Lands (PvE)",
    tutorials: [
      {
        id: 3,
        name: "Your First Land & First Battle!",
        description: "",
        yt_url: "QGEJXP5yKrE",
        is_official: true,
        is_for_children: false,
        locale: "en",
        status: "APPROVED",
        user_id: 2,
        thumbnail: "https://i.ytimg.com/vi/QGEJXP5yKrE/hqdefault.jpg",
      },
    ],
  },
  
  // Add more categories as needed
];

const TutorialsPage: NextPage = () => {
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6  mx-auto max-w-[70rem] overflow-y-scroll no-scrollbar">
      <div className="p-4 rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="">
              {t("translation:video_categories.tutorials.title")}
            </strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-3">
          {t("translation:tutorials_page_desc")}
        </h3>
      </div>
      <div className="pl-4 flex flex-col lg:flex-row justify-between mt-4 flex-wrap"></div>

      <div className="w-full flex gap-4 flex-wrap flex-col">
        {tutorialCategories.map((category) => (
          <div key={category.category} className="mt-6">
            <h4 className="scroll-m-20 text-[1.5rem] font-semibold mb-4 pl-4">
              {category.category}
            </h4>
            <div className="w-full ml-4 flex gap-4 flex-wrap">
              {category.tutorials.map((video) => (
                <VideoBox video={video} key={video.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;
