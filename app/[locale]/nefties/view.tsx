"use client";

import NeftieBox from "@/components/neftie-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ElementList } from "@/lib/data/elements";
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
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem]">
      <div className="p-4 rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-normal tracking-tight first:mt-0">
            <strong className="bg-secondary p-2 rounded-sm">
              {t("translation:nefties")}
            </strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-3">
          {t("translation:nefties_page_desc")}
        </h3>
      </div>
      <div className="filter-area flex gap-6 ml-4 mb-4 mt-6 border-b pb-4 items-center">
        <Input
          placeholder={t("translation:search_nefties")}
          className="rounded-none max-w-[150px] transition-all focus:max-w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex uppercase">
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
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-6">
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
