"use client";

import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Input } from "../ui/input";
import NewVideoForm from "./new-video-form";

const PostNewVideo = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [postStep, setPostStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoInformation, setVideoInformation] = useState();

  const getInformationFromYouTube = async () => {
    setIsLoading(true);
    const youtubeLinkRegex =
      /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)(?:[\&\?][\w\=\&]+)*$/;

    const match = youtubeUrl.match(youtubeLinkRegex);

    if (match) {
      const videoId = match[1];
      try {
        const getVideoInformation = await axios.get(
          `/api/youtube?youtube=${videoId}` // Send the video ID to the backend
        );

        setVideoInformation(getVideoInformation.data.data.items[0]);
        setPostStep(2);
        // You might want to do something with the response here
      } catch (error) {
        return toast({
          description: t("translation:errors.couldnt_get_video_information"),
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      return toast({
        description: t("translation:errors.enter_valid_youtube_url"),
      });
    }
  };

  return (
    <div className="pt-4 text-xl font-semibold px-4 max-w-[70rem]">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !isLoading && setIsOpen(open)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {postStep === 1
                ? t("translation:video_form.enter_youtube_link")
                : t("translation:video_form.video_details")}
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 mb-1">
                {postStep === 1
                  ? t("translation:video_form.youtube_link_desc")
                  : t("translation:video_form.video_details_desc")}
              </div>
            </DialogDescription>
          </DialogHeader>
          {postStep === 1 && (
            <Input
              placeholder="https://www.youtube.com/watch?v=KO0YwRNi2EQ"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              disabled={isLoading}
            />
          )}
          {postStep === 2 && <NewVideoForm data={videoInformation} />}
          {postStep === 1 && (
            <DialogFooter className="sm:justify-start !justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isLoading}>
                  {t("translation:close")}
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="default"
                onClick={getInformationFromYouTube}
                disabled={isLoading}
              >
                {t("translation:next_step")}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewVideo;
