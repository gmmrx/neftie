"use client";
import { useState, useEffect } from "react";
import EggBox from "@/components/egg-box";
import { useEggs } from "@/providers/EggsProvider";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ListNefties: NextPage = () => {
  const { t } = useTranslation();
  const { eggs } = useEggs();
  const [selectedEgg, setSelectedEgg] = useState(eggs[0]);
  useEffect(() => {
    if (eggs.length > 0 && !selectedEgg) setSelectedEgg(eggs[0]);
  }, [eggs, selectedEgg]);

  console.log(selectedEgg)
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] max-w-[70rem] mx-auto overflow-y-scroll no-scrollbar pb-6 flex flex-col">
      <div className="rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-[36px] font-normal tracking-tight first:mt-0">
            <strong className="">{t("translation:eggs")}</strong>
          </h2>
        </div>

        <h3 className="scroll-m-20 text-xl font-thin mt-3 mb-8">
          {t("translation:egg_desc")}
        </h3>
      </div>
      <aside className="bg-white/5 flex overflow-y-hidden overflow-x-scroll rounded-md flex-row no-scrollbar flex-grow w-[100%] max-h-[100px] border border-[#212121]">
        {eggs &&
          eggs.length > 0 &&
          eggs.map((egg) => {
            return (
              <div
                className={`flex flex-col items-center gap-2 justify-center cursor-pointer p-4 max-h-[100px] px-6 group hover:bg-black ${selectedEgg?.name === egg?.name && "bg-black/50"}`}
                key={egg.name}
                onClick={() => setSelectedEgg(egg)}
              >
                <img
                  src={egg.image}
                  className={`max-w-[50px] max-h-[50px] opacity-50 group-hover:opacity-100  ${selectedEgg?.name === egg?.name && "opacity-100"}`}
                />
                <span
                  className={`text-white/20 font-bold text-base text-[#1A1A1A] group-hover:text-[rgb(255,209,47)] ${selectedEgg?.name === egg?.name && "!text-[rgb(255,209,47)]"}`}
                >
                  {egg.name}
                </span>
              </div>
            );
          })}
      </aside>
      <div className="flex flex-wrap w-[100%]">
        {selectedEgg && selectedEgg?.name && <EggBox egg={selectedEgg} />}
      </div>
    </div>
  );
};

export default ListNefties;
