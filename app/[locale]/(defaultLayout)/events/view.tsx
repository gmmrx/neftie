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
import PostNewEvent from "@/components/post-new-event";
import { useEvents } from "@/providers/EventsProvider";
import EventBox from "@/components/event-box";

const EventsPage: NextPage = () => {
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
  const { events } = useEvents();
  const [isPostEventOpen, setIsPostEventOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem] overflow-y-scroll no-scrollbar">
      <div className="p-4 rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="bg-secondary p-2 rounded-sm">
              {t("translation:events")}
            </strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-3">
          {t("translation:events_page_desc")}
        </h3>
      </div>
      <div className="pl-4 flex flex-col lg:flex-row justify-between mt-4 flex-wrap">
        {session && session.user && (
          <div className="post-event lg:mt-0 mt-4">
            <Button
              variant={"secondary"}
              className="flex gap-2"
              onClick={() => setIsPostEventOpen(true)}
            >
              {t("translation:create_event")}
            </Button>
          </div>
        )}
        <PostNewEvent isOpen={isPostEventOpen} setIsOpen={setIsPostEventOpen} />
        <div className="w-full mt-4 flex gap-4 flex-wrap">
          {events &&
            events.length > 0 &&
            events.map((event) => {
              return <EventBox event={event} key={event.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
