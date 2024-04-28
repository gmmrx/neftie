"use client";

import { findNeftiesByElement } from "@/lib/data/elements";
import { Neftie } from "@/lib/data/nefties";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
type UserProfileProps = {
  slug: string | undefined;
};

const SingleNeftie: NextPage<UserProfileProps> = ({ slug }) => {
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
  if (nefties.length === 0) return null;
  const url = neftie?.image;
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh]">
      <div className="w-full rounded-sm p-2 flex flex-wrap lg:justify-start justify-center gap-4 items-center">
        <div
          style={{ backgroundImage: `url(${url})` }}
          className={`rounded-full w-[150px] h-[150px] object-cover bg-center bg-[length:170%_180%]`}
        />
        <div>
          <div className="uppercase text-2xl">{neftie?.name}</div>
          <div className="font-thin text-xs my-2">
            {t("translation:element").toUpperCase()}:{" "}
            <span className="font-normal">
              {t(`translation:elements.${neftie?.element}`).toUpperCase()}
            </span>
          </div>
          <div className="font-normal mt-1 text-sm max-w-[600px]">
            {t(`translation:neftie_list.${neftie?.description}`)}
          </div>
        </div>
      </div>
      <div className="skills flex flex-wrap lg:flex-nowrap gap-2 my-6">
        {neftie?.skills.map((skill, index) => {
          const skills = t(`translation:neftie_list.${neftie?.slug}.skills`, {
            returnObjects: true,
          });

          return (
            <div
              className="border w-full rounded-md p-4 mb-4 border-[#706F6F]"
              key={skill.description}
            >
              <div></div>
              <div className="font-semibold text-base flex items-center gap-2">
                {" "}
                <img src={skill.icon} className="max-w-[20px]" />
                {skills && skills.length > 0 && skills[index].name}
              </div>
              <div className="font-normal text-xs">
                {skills && skills.length > 0 && skills[index].description}
              </div>
            </div>
          );
        })}
      </div>
      <div className="vsat flex flex-col lg:flex-row gap-6">
        <div className="goodat border border-[#007f39] ml-1 rounded-md w-full lg:w-[33%]">
          <div className="bg-[#007f39] p-2 text-sm text-ibmplex uppercase mb-1">
            {t("translation:strong_against")}
          </div>
          {getNeftieVsResults &&
            getNeftieVsResults.good &&
            getNeftieVsResults?.good.map((neftie) => {
              const neftieImageUrl = neftie.image;
              return (
                <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                  <div className="flex gap-2 items-center p-3 hover:bg-black">
                    <div
                      style={{ backgroundImage: `url(${neftieImageUrl})` }}
                      className={`rounded-full w-[40px] h-[40px] object-cover bg-center bg-[length:170%_180%]`}
                    />
                    <div>
                      <div className="text-sm">{neftie.name}</div>
                      <div className="font-thin text-xs uppercase">
                        {t("translation:element")}:{" "}
                        <span className="font-normal">
                          {t(
                            `translation:elements.${neftie.element}`
                          ).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        <div className="goodat border border-[#8d0000] ml-1 rounded-md w-full lg:w-[33%]">
          <div className="bg-[#8d0000] p-2 text-sm text-ibmplex uppercase">
            {t("translation:weak_against")}
          </div>
          {getNeftieVsResults &&
            getNeftieVsResults.bad &&
            getNeftieVsResults?.bad.map((neftie) => {
              const neftieImageUrl = neftie.image;
              return (
                <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                  <div className="flex gap-2 items-center p-3 hover:bg-black">
                    <div
                      style={{ backgroundImage: `url(${neftieImageUrl})` }}
                      className={`rounded-full w-[40px] h-[40px] object-cover bg-center bg-[length:170%_180%]`}
                    />
                    <div>
                      <div className="text-sm">{neftie.name}</div>
                      <div className="font-thin text-xs uppercase">
                        {t("translation:element")}:{" "}
                        <span className="font-normal">
                          {t(
                            `translation:elements.${neftie.element}`
                          ).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        <div className="goodat border ml-1 rounded-md w-[33%] max-h-[31.25rem] overflow-x-scroll w-full lg:w-[33%]">
          <div className="bg-secondary p-2 text-sm text-ibmplex uppercase">
            {t("translation:neutral_against")}
          </div>
          {getNeftieVsResults &&
            getNeftieVsResults.neutral &&
            getNeftieVsResults?.neutral.map((neftie) => {
              const neftieImageUrl = neftie.image;
              return (
                <Link href={`/neftie/${neftie.slug}`} key={neftie.name}>
                  <div
                    key={neftie.name}
                    className="flex gap-2 items-center  p-3 hover:bg-black"
                  >
                    <div
                      style={{ backgroundImage: `url(${neftieImageUrl})` }}
                      className={`rounded-full w-[40px] h-[40px] object-cover bg-center bg-[length:170%_180%]`}
                    />
                    <div>
                      <div className="text-sm">{neftie.name}</div>
                      <div className="font-thin text-xs uppercase">
                        {t("translation:element")}:{" "}
                        <span className="font-normal">
                          {t(
                            `translation:elements.${neftie.element}`
                          ).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SingleNeftie;
