"use client";
/* eslint-disable @next/next/no-img-element */
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import NeftieListHome from "../neftie-list-home";

const WhatIsNeftieBox: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="p-8 rounded-sm w-full text-left bg-whatsNeftieBg relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
        <div className="flex justify-between items-center relative z-[1]">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0 bg-black p-2 rounded-sm">
            <Trans
              i18nKey={t(`translation:nefties`)}
              components={{
                Neftie: <strong />,
              }}
            />
          </h2>
          <Link href="/nefties">
            <div className="cursor-pointer uppercase text-sm flex items-center gap-1 border-white bg-[#000] p-2 rounded-sm">
              {t("translation:explore_all")} <ChevronRight size={18} />
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-between rounded-md overflow-y-visible gap-8 overflow-x-scroll no-scrollbar lg:overflow-visible mt-4 w-full">
          <NeftieListHome />
        </div>
      </div>
    </>
  );
};

export default WhatIsNeftieBox;
