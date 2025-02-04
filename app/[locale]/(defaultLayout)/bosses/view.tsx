"use client";

import BossCard from "@/components/boss-card";
import NeftieBox from "@/components/neftie-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ElementList } from "@/lib/data/elements";
import { useBosses } from "@/providers/BossesProvider";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const sortOptions = [
  { value: "name_asc", label: "Name ASC" },
  { value: "name_desc", label: "Name DESC" },
  { value: "date_asc", label: "Creation Date ASC" },
  { value: "date_desc", label: "Creation Date DESC" },
];

const ListBosses: NextPage = () => {
  const { t } = useTranslation();
  const { bosses } = useBosses();
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] mx-auto max-w-[70rem]">
      <div className="rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="">{t("translation:elites")}</strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-0">
          {t("translation:elites_desc")}
        </h3>
      </div>
      <div className="flex flex-wrap gap-12 justify-between">
        {bosses &&
          bosses.ELITE &&
          bosses.ELITE.length > 0 &&
          bosses.ELITE.map((boss) => <BossCard boss={boss} />)}
      </div>
      <div className="rounded-sm w-full text-left mt-12">
        <div className="flex justify-between items-center">
          <h2 className=" pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="">{t("translation:bosses")}</strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-0">
          {t("translation:bosses_desc")}
        </h3>
      </div>
      <div className="flex flex-wrap gap-12 justify-between mt-12">
        {bosses &&
          bosses.BOSS &&
          bosses.BOSS.length > 0 &&
          bosses.BOSS.map((boss) => <BossCard boss={boss} />)}
      </div>
    </div>
  );
};

export default ListBosses;
