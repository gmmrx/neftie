"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, FC } from "react";
import { Trans, useTranslation } from "react-i18next";

const WhatIsEgg: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-sm w-full text-left">
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
          <Trans
            i18nKey={t(`translation:what_is_an_egg`)}
            components={{
              Neftie: <strong className="bg-secondary p-2 rounded-sm" />,
            }}
          />
        </h2>
      </div>

      <h3 className="scroll-m-20 text-xl font-thin mt-3">
        <Trans i18nKey={t(`translation:egg_desc`)} components={{}} />
      </h3>
    </div>
  );
};

export default WhatIsEgg;
