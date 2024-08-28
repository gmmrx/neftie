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
      {nefties.slice(0, 7).map((neftie) => {
        return (
          <NeftieBox
            key={neftie.name}
            neftie={neftie}
            className="bg-[white] border-0 text-sm uppercase text-black"
          />
        );
      })}
    </>
  );
};

export default NeftieListHome;
