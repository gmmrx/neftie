"use client";

import VideoTooltip from "@/components/video-tooltip";
import { findNeftiesByElement } from "@/lib/data/elements";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type UserProfileProps = {
  slug: string | undefined;
  gifs: string[];
  videos: string[];
};

const SingleNeftie: NextPage<UserProfileProps> = ({ slug, gifs, videos }) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const neftie = nefties.find((neftie) => neftie.slug === slug);

  const getNeftieVsResults = useMemo(() => {
    if (!neftie) return null;
    const neftieElement = neftie.element;

    const result = findNeftiesByElement(neftieElement, nefties);
    return result;
  }, [neftie, nefties]);
  if (nefties.length > 0 && !neftie) {
    return (
      <div className="text-center pt-10 text-xl font-semibold">
        {t("translation:errors.cant_found_neftie")}
      </div>
    );
  }

  const sameElementNefties = (neftie) => {
    if (nefties.length === 0) return null;
    return nefties.filter(
      (singleNeftie) => singleNeftie.element === neftie.element
    );
  };

  if (nefties.length === 0) return null;
  const url = neftie?.image;
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 max-w-[1100px] mx-auto">
      <div className="w-full rounded-sm p-2 flex flex-wrap lg:justify-start justify-center gap-4 items-center">
        <div
          style={{
            backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
          }}
          className={`rounded-md w-[150px] h-[150px] bg-[#151515] object-cover bg-center bg-[length:95%_95%] bg-no-repeat`}
        />
        <div className="">
          <div className="uppercase text-2xl">{neftie?.name}</div>
          <div className="font-thin text-xs my-2">
            {t("translation:element").toUpperCase()}:{" "}
            <span className="font-normal">
              {t(`translation:elements.${neftie?.element}`).toUpperCase()}
            </span>
          </div>
          <div className="font-normal mt-1 text-sm max-w-[600px] text-[#c7c7c7]">
            {t(`nefties:${neftie?.description}`)}
          </div>
        </div>
      </div>
      <div className="skills grid grid-cols-3 gap-2 my-6">
        {neftie?.skills.map((skill, index) => {
          const videoUrl = videos && videos.length > 0 && videos[index];
          const skills = t(`nefties:${neftie?.slug}.skills`, {
            returnObjects: true,
          });
          console.log(videoUrl);
          return (
            <Dialog key={skill.description}>
              <DialogTrigger asChild>
                <div
                  className="border w-full rounded-md p-4 mb-4 border-[#2a2a2a] bg-[#141414] relative flex justify-between items-start cursor-pointer group"
                  key={skill.description}
                >
                  <div className="font-semibold text-base flex items-start gap-2 max-w-[70%]">
                    {" "}
                    <img src={skill.icon} className="max-w-[20px]" />
                    <div>
                      {skills && skills.length > 0 && skills[index].name}
                      <div className="font-normal text-xs mt-2 text-[#c7c7c7] transition-all">
                        {skills &&
                          skills.length > 0 &&
                          skills[index].description}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm flex gap-2 lowercase p-1 border rounded-sm px-2 h-[30px] w-[60px]">
                    <img
                      src="/images/hype.png"
                      alt="Hype"
                      className="w-[18px] h-[18px]"
                    />
                    <span
                      className=""
                      style={{ fontVariant: "all-small-caps" }}
                    >
                      {skill?.hype}
                    </span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full lg:max-w-[800px] h-full rounded-md">
                {videoUrl && (
                  <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    className="h-[480px] w-full"
                  />
                )}
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
      {gifs.length > 0 ? (
        <div className="w-full flex flex-col gap-4 overflow-x-scroll no-scrollbar mb-[2rem] bg-[#151515] p-4 rounded-md">
          <h1 className="">GIFs</h1>
          <div className="w-full flex gap-4">
            {gifs.map((gif, index) => (
              <img
                key={index}
                src={gif}
                alt={`${slug} gif ${index + 1}`}
                className="max-w-[150px]"
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="vsat flex flex-col gap-8 flex-wrap">
        <div className="goodat ml-1 rounded-md w-full flex flex-col lg:flex-row">
          <div className="bg-[#007f39] p-2 text-base text-ibmplex uppercase mb-1  rounded-tl-md rounded-bl-md  w-full lg:w-[12.5rem] text-center max-h-[40px] ">
            {t("translation:strong_against")}
          </div>
          <div className="flex flex-wrap items-center gap-8 p-3 bg-[#151515]  w-full lg:w-[calc(100%-200px)]">
            {getNeftieVsResults &&
              getNeftieVsResults.good &&
              getNeftieVsResults?.good.map((neftie) => {
                const neftieImageUrl = neftie.image;
                return (
                  <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                    <div className="flex flex-col gap-2 items-center p-3 hover:bg-black w-[110px]">
                      <div
                        style={{
                          backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
                        }}
                        className={`rounded-md w-[40px] h-[40px] object-cover bg-[#1A1A1A] bg-center bg-[length:80%_80%] bg-no-repeat`}
                      />
                      <div>
                        <div className="text-sm">{neftie.name}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="goodat  ml-1 max-h-[31.25rem] overflow-x-scroll no-scrollbar w-full flex flex-col lg:flex-row">
          <div className="bg-[#8d0000] p-2 text-base text-ibmplex uppercase w-full lg:w-[12.5rem] rounded-tl-md rounded-bl-md text-center max-h-[40px]">
            {t("translation:weak_against")}
          </div>
          <div className="flex flex-wrap items-center gap-8 p-3 bg-[#151515] w-full lg:w-[calc(100%-200px)]">
            {getNeftieVsResults &&
              getNeftieVsResults.bad &&
              getNeftieVsResults?.bad.map((neftie) => {
                const neftieImageUrl = neftie.image;
                return (
                  <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                    <div className="flex gap-2 items-center flex-col p-3 rounded-md hover:bg-black w-[110px]">
                      <div
                        style={{
                          backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
                        }}
                        className={`rounded-md w-[40px] h-[40px] object-cover bg-[#1A1A1A] bg-center bg-[length:80%_80%] bg-no-repeat`}
                      />
                      <div>
                        <div className="text-sm">{neftie.name}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="goodat  ml-1 max-h-[31.25rem] overflow-x-scroll no-scrollbar w-full flex flex-col lg:flex-row">
          <div className="bg-secondary p-2 text-base text-ibmplex uppercase w-full lg:w-[12.5rem] rounded-tl-md rounded-bl-md text-center max-h-[40px]">
            {t("translation:neutral_against")}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 p-3 bg-[#151515] w-full lg:w-[calc(100%-200px)]">
            {getNeftieVsResults &&
              getNeftieVsResults.neutral &&
              getNeftieVsResults?.neutral.map((neftie) => {
                const neftieImageUrl = neftie.image;
                return (
                  <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                    <div
                      key={neftie.name}
                      className="flex gap-2 items-center flex-col rounded-sm hover:bg-black p-3 w-[110px]"
                    >
                      <div
                        style={{
                          backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
                        }}
                        className={`rounded-md w-[40px] h-[40px] object-cover bg-[#1A1A1A] bg-center bg-[length:80%_80%] bg-no-repeat`}
                      />
                      <div>
                        <div className="text-sm">{neftie.name}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="goodat ml-1 max-h-[31.25rem] overflow-x-scroll no-scrollbar w-full flex flex-col lg:flex-row mb-4">
          <div className="bg-secondary p-2 text-base text-ibmplex uppercase  w-full lg:w-[12.5rem] rounded-tl-md rounded-bl-md text-center max-h-[40px]">
            {t("translation:same_element")}
          </div>
          <div className="flex flex-wrap items-center gap-8 p-3 bg-[#151515] w-full lg:w-[calc(100%-200px)]">
            {sameElementNefties(neftie)?.map((neftie) => {
              const neftieImageUrl = neftie.image;
              return (
                <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                  <div
                    key={neftie.name}
                    className="flex gap-2 items-center flex-col p-3 rounded-sm hover:bg-black p-3 w-[110px]"
                  >
                    <div
                      style={{
                        backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
                      }}
                      className={`rounded-md w-[40px] h-[40px] object-cover bg-[#1A1A1A] bg-center bg-[length:80%_80%] bg-no-repeat`}
                    />
                    <div>
                      <div className="text-sm">{neftie.name}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNeftie;
