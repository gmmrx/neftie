"use client";

import PostNewVideo from "@/components/post-new-video";
import { Button } from "@/components/ui/button";
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
  const { videoCategories } = useVideos();
  const [isPostVideoOpen, setIsPostVideoOpen] = useState<boolean>(false);

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
      <div className="pl-4 flex justify-between mt-4 flex-wrap">
        <div className="flex gap-4">
          <div className="bg-secondary px-3 rounded-sm py-2 cursor-pointer !bg-black hover:bg-black text-sm leading-[1.5rem]">
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
                  className="bg-secondary px-3 rounded-sm py-2 cursor-pointer hover:bg-black text-sm leading-[1.5rem]"
                >
                  {titleTranslationKey}
                </div>
              );
            })}
        </div>
        {session && session.user && (
          <div className="post-video">
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
    </div>
  );
};

export default VideosPage;
