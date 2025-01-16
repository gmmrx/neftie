"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { DownloadIcon } from "lucide-react";
import LatestBattleRow from "./row";

const LatestBattles: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-[1.625rem]">
      <div className="font-inter font-medium text-base">Latest Battles</div>
      <LatestBattleRow />
      <LatestBattleRow />
      <LatestBattleRow />
    </div>
  );
};

export default LatestBattles;
