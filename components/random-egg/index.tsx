"use client";
import React, { useEffect, useState } from "react";
import { useEggs } from "@/providers/EggsProvider";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "../ui/button";

export const RandomEgg = () => {
  const { t } = useTranslation();
  const { eggs } = useEggs();
  const [selectedEgg, setSelectedEgg] = useState();
  useEffect(() => {
    if (!selectedEgg && eggs.length > 0)
      setSelectedEgg(eggs[Math.floor(Math.random() * eggs.length)]);
  }, [eggs, selectedEgg]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full font-semibold font-inter text-[1rem]">
        Featured Egg{" "}
        <Button className="p-0 w-[3.5rem] h-[1.8125rem] bg-[#ffffff]/5 text-white hover:bg-#ffffff]/10 font-light text-[0.875rem]">
          See all
        </Button>
      </div>
      <div className="overflow-visible w-full bg-black rounded-md mt-4 pt-4 h-[9rem] bg-[#ffffff]/5 border border-[#ffffff]/50 relative">
        {selectedEgg && (
          <img
            src={selectedEgg?.image}
            className={`w-[144px] h-[166px] object-contain bg-center mx-auto min-w-[30px] absolute -left-[26px] -top-[14px] border-0`}
          />
        )}

        {selectedEgg && (
          <div className="lg:max-h-[400px] no-scrollbar flex items-center gap-4 relative ml-auto w-[calc(100%-122px)] overflow-x-scroll">
            <div>
              <div className="text-[1.5rem] font-medium flex justify-between font-inter font-black -mt-2">
                <a href="/eggs"> {selectedEgg?.name} Egg</a>
              </div>
              <div className="uppercase font-inter text-[0.625rem] text-white/70 mt-4 mb-2">possible hatchlings:</div>
              <div className="flex p-1 gap-[0.5rem] w-full overflow-x-scroll no-scrollbar">
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
                          href={`https://neftie.gg/neftie/${neftie.name.toLowerCase().replace(" ", "-")}`}
                        >
                          <img
                            src={`/images/mini-nefties/${neftie.slug}.png`}
                            className="max-w-[30px] max-h-[30px] mx-auto"
                            alt={neftie.name}
                          />
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
