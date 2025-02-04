"use client";
/* eslint-disable @next/next/no-img-element */
import { VideoAttributes } from "@/models/Videos";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const VideoBox: FC<{ video: VideoAttributes }> = ({ video }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!video) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="max-w-[300px] cursor-pointer">
            <div className="flex flex-col items-start gap-0 relative">
              <img
                src={video.thumbnail}
                alt={video.name}
                className="max-w-full"
              />
              <div
                className="text-center absolute bottom-4 bg-grey w-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 45%)",
                }}
              >
                <div className="text-center text-md max-w-[80%] mx-auto text-white">
                  {video.name}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="!max-w-[800px] !h-[500px]">
          <DialogHeader>
            <h3 className="text-lg font-semibold">{video.name}</h3>
          </DialogHeader>
          <div className="flex justify-center items-center w-full h-[400px]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.yt_url}`}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoBox;
