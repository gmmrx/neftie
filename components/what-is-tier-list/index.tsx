"use client";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, FC } from "react";
import { Trans, useTranslation } from "react-i18next";

const WhatIsTierListBox: FC = ({ type = "all" }) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-sm w-full text-left">
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-[36px] font-normal font-inter first:mt-0">
          {type === "all" ? (
            <Trans
              i18nKey={t(`translation:what_is_a_tier_list`)}
              components={{
                bold: <strong className="" />,
              }}
            />
          ) : (
            <Trans
              i18nKey={t(`translation:what_is_a_tier_list_${type}`)}
              components={{
                bold: <strong className="" />,
              }}
            />
          )}
        </h2>
        <div className="text-sm max-w-fit p-2 rounded-sm bg-white/10 text-xs font-normal uppercase">
          {t("translation:current_patch")}:
          <span className="font-semibold ml-1">{CURRENT_PATCH_VERSION}</span>
        </div>
      </div>

      <h3 className="scroll-m-20 text-xl font-thin mt-3">
        {type === "all" ? (
          <Trans
            i18nKey={t(`translation:tier_list_desc`)}
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
              aurorylink: <Link href="https://aurory.io" target="_blank" />,
            }}
          />
        ) : (
          <Trans
            i18nKey={t(`translation:tier_list_desc_${type}`)}
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
              aurorylink: <Link href="https://aurory.io" target="_blank" />,
            }}
          />
        )}
      </h3>
    </div>
  );
};

export default WhatIsTierListBox;
