"use client";
/* eslint-disable @next/next/no-img-element */
import { EggsAttributes } from "@/models/Eggs";
import Link from "next/link";
import React, { useState, FC } from "react";
import { useTranslation } from "react-i18next";

const EggBox: FC<{ egg: EggsAttributes }> = ({ egg }) => {
  const { t } = useTranslation();
  if (!egg) return null;
  const url = egg.image;

  const transformFoundAts = (key: string) => {
    switch (key) {
      case "mp":
        return t("translate:marketplace");
      case "exp":
        return t("translate:expeditions");
      case "land":
        return t("translate:lands");
      default:
        return t("translate:marketplace");
    }
  };

  const getUrlsForFoundAts = (key: string) => {
    switch (key) {
      case "mp":
        return "https://app.aurory.io/marketplace/collection/eggs";
      case "exp":
        return "https://app.aurory.io/expeditions";
      case "land":
        return "https://app.aurory.io/seekers-of-tokane/";
      default:
        return "https://app.aurory.io/marketplace/collection/eggs";
    }
  };

  return (
    <div className="ml-4 p-4 rounded-sm max-w-[500px] text-center border w-auto cursor-pointer hover:border-[#4d4d4d] transition-all relative mt-6">
      <div className="flex flex items-start gap-2 relative">
        <div
          style={{ backgroundImage: `url(${url})` }}
          className={`rounded-[100%] w-[30px] h-[40px] object-cover bg-center bg-[length:180%_170%] min-w-[30px]`}
        />
        <div>
          <div className="font-medium text-base text-left">{egg.name}</div>
          <div className="font-thin text-xs text-left">
            {t(`translation:${egg.description}`)}
          </div>
        </div>
      </div>
      <div className="text-sm text-left mt-4 flex gap-2 flex-col">
        <div className="flex gap-2 border p-2 font-thin rounded-sm items-center text-xs uppercase">
          <span className="">{t('translation:obtainable_from')}</span>
          {egg.foundAt &&
            egg.foundAt.length > 0 &&
            egg.foundAt.map((foundAt) => {
              return (
                <div key={foundAt} className="font-normal">
                  <Link href={getUrlsForFoundAts(foundAt)} target="_blank">
                    {transformFoundAts(foundAt)}
                  </Link>{" "}
                </div>
              );
            })}
        </div>
        <div className="flex gap-4 border p-2 font-thin rounded-sm items-center text-xs uppercase">
          <span className="">{t('translation:nefties')}:</span>
          {egg.eggs &&
            egg.eggs.length > 0 &&
            egg.eggs.map((neftie) => {
              return (
                <div key={neftie.name}>
                  <img
                    src={`/images/mini-nefties/${neftie.slug}.png`}
                    className="w-[25px]"
                    alt={neftie.name}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default EggBox;
