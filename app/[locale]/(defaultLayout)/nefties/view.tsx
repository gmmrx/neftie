"use client";

import NeftieBox from "@/components/neftie-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ElementList } from "@/lib/data/elements";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const sortOptions = [
  { value: "name_asc", label: "Name ASC" },
  { value: "name_desc", label: "Name DESC" },
  { value: "date_asc", label: "Creation Date ASC" },
  { value: "date_desc", label: "Creation Date DESC" },
];

const ListNefties: NextPage = () => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElement, setSelectedElement] = useState("all");
  const [sortCriteria, setSortCriteria] = useState("name_asc");

  const filteredAndSortedNefties = useMemo(() => {
    return nefties.filter((neftie) => {
      const matchesSearchTerm = neftie.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesElement =
        selectedElement === "all" ||
        neftie.element.toLowerCase() === selectedElement.toLowerCase();
      return matchesSearchTerm && matchesElement;
    });
  }, [nefties, searchTerm, selectedElement]);

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] mx-auto max-w-[70rem]">
      <div className="rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-[36px] font-normal tracking-tight first:mt-0">
            <strong className="">{t("translation:nefties")}</strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-3">
          {t("translation:nefties_page_desc")}
        </h3>
      </div>
      {/* <div className="filter-area flex flex-col lg:flex-row gap-6 mb-4 mt-6 pb-2 items-center">
        <Input
          placeholder={t("translation:search_nefties")}
          className="rounded-none w-full lg:max-w-[150px] transition-all lg:focus:max-w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap uppercase">
          <Button
            variant="default"
            className={`rounded-none uppercase text-xs ${
              selectedElement === "all" ? "bg-black" : "bg-secondary"
            } text-white hover:bg-black`}
            onClick={() => setSelectedElement("all")}
          >
            {t("translation:all")}
          </Button>
          {ElementList.map((element) => {
            const translationString = `translation:elements.${element.name}`;
            return (
              <Button
                variant="default"
                className={`rounded-none uppercase text-xs ${
                  selectedElement === element.name ? "bg-black" : "bg-secondary"
                } text-white hover:bg-black`}
                key={element.name}
                onClick={() => setSelectedElement(element.name)}
              >
                {t(translationString)}
              </Button>
            );
          })}
        </div>
      </div> */}
      <div className="mt-12 flex gap-4">
        <div className="pb-1 border-b-[3px] border-[#d0364f] cursor-pointer font-bold text-[#d0364f]">
          Nefties
        </div>
        <div className="cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f]  font-bold">
          {" "}
          <Link href="/neftie-leaderboards/bitebit">Leaderboards</Link>
        </div>
      </div>
      <div className="py-6 mt-4 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-10 rounded-md gap-6 justify-center p-4 bg-white/5">
        {filteredAndSortedNefties &&
          filteredAndSortedNefties.length > 0 &&
          filteredAndSortedNefties.map((neftie) => {
            return <NeftieBox key={neftie.name} neftie={neftie} />;
          })}
      </div>
    </div>
  );
};

export default ListNefties;
