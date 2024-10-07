"use client";

import PostNewVideo from "@/components/post-new-video";
import { Button } from "@/components/ui/button";
import VideoBox from "@/components/video-box";
import { useVideos } from "@/providers/VideosProvider";
import { Video } from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE } from "@/lib/data/constants";

const VideosPage: NextPage = () => {
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
  const [isPostVideoOpen, setIsPostVideoOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );
  const { videoCategories, setFilter, filter, videos } = useVideos();

  const handleCategoryClick = (categoryId: number | "all") => {
    if (categoryId === "all") {
      setFilter(selectedLanguage, null); // Reset filter
    } else {
      setFilter(selectedLanguage, categoryId);
    }
  };

  const handleLanguageClick = (langCode: string) => {
    setSelectedLanguage(langCode);
    setFilter(langCode, filter.categoryId);
  };

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6  mx-auto max-w-[70rem] overflow-y-scroll no-scrollbar">
      <div className="p-4 rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="bg-secondary p-2 rounded-sm">
              {t("translation:video_categories.tutorials.title")}
            </strong>
          </h2>
        </div>
      </div>
      <div className="pl-4 flex flex-col lg:flex-row justify-between mt-4 flex-wrap">
       
      </div>
      <PostNewVideo isOpen={isPostVideoOpen} setIsOpen={setIsPostVideoOpen} />
      <div className="w-full ml-4 flex gap-4 flex-wrap">
        {videos &&
          videos.length > 0 &&
          videos.map((video) => {
            return <VideoBox video={video} key={video.id} />;
          })}
      </div>
    </div>
  );
};

export default VideosPage;
