"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, FC } from "react";
import { Trans, useTranslation } from "react-i18next";

const WhatIsNeftieBox: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-sm w-full text-left">
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
          <Trans
            i18nKey={t(`translation:what_is_a_neftie`)}
            components={{
              Neftie: <strong className="bg-secondary p-2 rounded-sm" />,
            }}
          />
        </h2>
        <Link href="/nefties">
          <div className="cursor-pointer uppercase text-sm flex items-center gap-1 border-b pb-1 border-white">
            {t("translation:explore_all")} <ChevronRight size={14} />
          </div>
        </Link>
      </div>

      <h3 className="scroll-m-20 text-xl font-thin mt-3">
        <Trans
          i18nKey={t(`translation:neftie_desc`)}
          components={{
            bold: (
              <strong className="bg-secondary p-2 py-0 rounded-sm hover:text-[#ffd12f] cursor-pointer" />
            ),
            sotlink: (
              <Link
                href="https://app.aurory.io/seekers-of-tokane"
                target="_blank"
              />
            ),
            aurorylink: (
              <Link
                href="https://aurory.io"
                target="_blank"
              />
            ),
          }}
        />
      </h3>
    </div>
  );
};

export default WhatIsNeftieBox;
