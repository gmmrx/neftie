"use client";
/* eslint-disable @next/next/no-img-element */
import { useNefties } from "@/providers/NeftiesProvider";
import React, { useState, FC } from "react";
import NeftieBox from "../neftie-box";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const NeftieListHome: FC = () => {
  const { nefties } = useNefties();
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      {nefties.slice(0, 5).map((neftie) => {
        return <NeftieBox key={neftie.name} neftie={neftie} />;
      })}
      {nefties && nefties.length > 0 && (
        <div className="ml-4 p-4 max-w-[130px] rounded-sm w-full text-center border w-[150px] h-[155px] cursor-pointer hover:border-[#4d4d4d] transition-all relative">
          <div className="flex flex-col relative">
            <div
              className={`rounded-full w-[80px] h-[80px] flex items-center justify-center text-center mx-auto`}
              onClick={() => router.push("/nefties")}
            >
              <ChevronRight />
            </div>
            <div className="font-medium mt-4">{t("translation:more")}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default NeftieListHome;
