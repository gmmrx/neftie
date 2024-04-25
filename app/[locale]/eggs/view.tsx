"use client";

import EggBox from "@/components/egg-box";
import WhatIsEgg from "@/components/what-is-egg";
import { useEggs } from "@/providers/EggsProvider";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ListNefties: NextPage = () => {
  const { t } = useTranslation();
  const { eggs } = useEggs();

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem] overflow-y-scroll pb-6">
      <WhatIsEgg />
      <div className="flex flex-wrap">
        {eggs &&
          eggs.length > 0 &&
          eggs.map((egg) => {
            return <EggBox egg={egg} key={egg.name} />;
          })}
      </div>
    </div>
  );
};

export default ListNefties;
