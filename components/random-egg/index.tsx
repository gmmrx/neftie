"use client";
import React, { useEffect, useState } from "react";
import { useEggs } from "@/providers/EggsProvider";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export const RandomEgg = () => {
  const { t } = useTranslation();
  const { eggs } = useEggs();
  const [selectedEgg, setSelectedEgg] = useState();
  useEffect(() => {
    if (!selectedEgg && eggs.length > 0)
      setSelectedEgg(eggs[Math.floor(Math.random() * eggs.length)]);
  }, [eggs, selectedEgg]);

  return (
    <div className="overflow-x-auto w-[35%] p-[0.2rem] bg-black rounded-md mt-4 pl-4 pt-4 h-[260px]">
      <div className="text-[1.4rem] mb-1 font-medium flex justify-between">
        <a href="/eggs"> {selectedEgg?.name} Egg</a>
      </div>
      {selectedEgg && (
        <div className="max-h-[400px] overflow-y-auto no-scrollbar flex items-center gap-4">
          <img
            src={selectedEgg.image}
            className={`w-[200px] h-[200px] object-contain bg-center mx-auto min-w-[30px]`}
          />
          <div className="flex p-2 gap-[1rem] w-full flex-wrap">
            {selectedEgg.eggs &&
              selectedEgg.eggs.length > 0 &&
              selectedEgg.eggs.map((neftie) => {
                const neftieCount = selectedEgg.eggs.length;
                const singleRow = 100 / neftieCount;
                const width = singleRow.toFixed(2) + "%";
                return (
                  <div
                    key={neftie.name}
                    className={`w-[${width}] flex flex-col items-center`}
                    style={{ width: width }}
                  >
                    <Link
                      href={`https://neftie.app/neftie/${neftie.name.toLowerCase().replace(" ", "-")}`}
                    >
                      <img
                        src={`/images/mini-nefties/${neftie.slug}.png`}
                        className="max-w-[40px] max-h-[40px] mx-auto mb-4"
                        alt={neftie.name}
                      />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
