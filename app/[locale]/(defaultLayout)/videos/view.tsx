"use client";

import PostNewVideo from "@/components/post-new-video";
import { Button } from "@/components/ui/button";
import VideoBox from "@/components/video-box";
import { useEggs } from "@/providers/EggsProvider";
import { useVideos } from "@/providers/VideosProvider";
import { Video } from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const VideosPage: NextPage = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [isPostVideoOpen, setIsPostVideoOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const { videoCategories, setFilter, filter, videos } = useVideos();

  const handleCategoryClick = (categoryId: number | "all") => {
    if (categoryId === "all") {
      setFilter(selectedLanguage, null); // Reset filter
    } else {
      setFilter(selectedLanguage, categoryId);
    }
  };

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem] overflow-y-scroll">
      <div className="p-4 rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="bg-secondary p-2 rounded-sm">
              {t("translation:videos")}
            </strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-3">
          {t("translation:videos_page_desc")}
        </h3>
      </div>
      <div className="pl-4 flex flex-col lg:flex-row justify-between mt-4 flex-wrap">
        <div className="flex flex-col lg:flex-row gap-4">
          <div
            className={`bg-secondary px-3 rounded-sm py-2 cursor-pointer ${
              filter.categoryId === null ? "!bg-black" : ""
            } hover:bg-black text-sm leading-[1.5rem]`}
            onClick={() => handleCategoryClick("all")}
          >
            {t("translation:all")}
          </div>
          {videoCategories &&
            videoCategories.length > 0 &&
            videoCategories.map((cat) => {
              const titleTranslationKey = t(
                `translation:video_categories.${cat.name}`
              );
              return (
                <div
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`bg-secondary px-3 rounded-sm py-2 cursor-pointer hover:bg-black text-sm leading-[1.5rem] ${
                    filter.categoryId === cat.id ? "!bg-black" : ""
                  }`}
                >
                  {titleTranslationKey}
                </div>
              );
            })}
        </div>
        {session && session.user && (
          <div className="post-video lg:mt-0 mt-4">
            <Button
              variant={"secondary"}
              className="flex gap-2"
              onClick={() => setIsPostVideoOpen(true)}
            >
              <Video className="w-[1.125rem]" /> {t("translation:post_a_video")}
            </Button>
          </div>
        )}
      </div>
      <PostNewVideo isOpen={isPostVideoOpen} setIsOpen={setIsPostVideoOpen} />
      <div className="w-full ml-4">
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
