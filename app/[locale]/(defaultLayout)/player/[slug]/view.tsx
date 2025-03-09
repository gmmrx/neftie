"use client";

import FavoriteNeftieRow from "@/components/favorite-neftie-row";
import LatestHatchRow from "@/components/latest-hatches/row";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import MatchHistoryBox from "@/components/match-history-box";

const auroryCdnUrl =
  "https://aurorians.cdn.aurory.io/aurorians-v2/current/images/mini/";

const SinglePlayerView: NextPage = ({ data }) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { data: session } = useSession();
  
  return (
    <main className="flex min-h-[84.5vh] flex-col lg:flex-row  gap-[4rem] items-start p-2 lg:p-10 lg:!pl-6 max-w-[77rem] min-h-[84.5vh] mx-auto font-ibmplex">
      <div className="flex flex-col w-[95%] lg:w-[46.125rem]">
        <div className="flex gap-4 items-center">
          {data && data.selectedAurorian ? (
            <img
              src={`${auroryCdnUrl}${data.selectedAurorian.details.attributes.Sequence}.png`}
              className="w-[150px] rounded-full h-[150px] object-cover"
              alt="Player avatar"
            />
          ) : (
            ""
          )}

          <div className="font-dosis font-bold text-[46px]">
            {data?.username}
            <div className="mt-2 font-inter flex gap-2 flex-col lg:flex-row">
              <Badge variant="default">
                {" "}
                <span className="text-lg pr-2">{data.stats.totalBattles}</span>
                Battles
              </Badge>

              <Badge
                variant="destructive"
                className="bg-[#0a8800] hover:bg-[#0a8800]/50"
              >
                {" "}
                <span className="text-lg pr-2">{data.stats.totalWins}</span>
                Wins
              </Badge>

              <Badge variant="destructive">
                {" "}
                <span className="text-lg pr-2">{data.stats.totalLosses}</span>
                Losses
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full flex-col lg:flex-row">
          <div className="mt-8 w-full">
            <div className="font-inter font-bold text-2xl">Last Battles</div>
            {data.detailedBattles &&
              data.detailedBattles.length > 0 &&
              data.detailedBattles.map((battle) => (
                <MatchHistoryBox key={battle.id} match={battle} />
              ))}
          </div>
        </div>
      </div>
      <div className="w-[1px] my-auto h-[550px] bg-white bg-gradient-to-b from-[#000000] via-[#999999] to-[#000000] hidden lg:block" />
      <div className="flex flex-col w-[380px]">
        <div className="w-full mt-[1.625rem]">
          <div className="font-inter font-medium text-base">
            Favorite Nefties
          </div>
          {data.favoriteNefties &&
            data.favoriteNefties.length > 0 &&
            data.favoriteNefties.map((neftie) => (
              <FavoriteNeftieRow key={neftie.id} data={neftie} />
            ))}
        </div>
        <div className="w-full mt-[1.625rem]">
          <div className="font-inter font-medium text-base">Latest Hatches</div>
          {data.recentHatches &&
            data.recentHatches.length > 0 &&
            data.recentHatches.map((hatch) => (
              <LatestHatchRow key={hatch.id} hatch={hatch} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default SinglePlayerView;
