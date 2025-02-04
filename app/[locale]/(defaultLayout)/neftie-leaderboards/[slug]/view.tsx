"use client";

import { auroryCdnUrl } from "@/components/latest-battles/row";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

const NeftieLeaderboards: NextPage = ({ slug }) => {
  const [selectedNeftie, setSelectedNeftie] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { nefties } = useNefties();

  useEffect(() => {
    if (slug && !selectedNeftie && nefties.length > 0) {
      const selected = nefties.find((neftie) => neftie.slug === slug);
      setSelectedNeftie(selected);
    }
  }, [slug, nefties]);

  useEffect(() => {
    const fetchPlayers = async (neftie) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/neftie-top-players?neftie=${neftie.name}`
        );
        const data = await response.json();
        setTopPlayers(data.data);
      } catch (error) {
        console.error("Error fetching top neftie players:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (selectedNeftie) {
      fetchPlayers(selectedNeftie);
    }
  }, [selectedNeftie]);

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] mx-auto max-w-[70rem]">
      <h2 className="text-[36px] font-normal">
        <strong>
          <Trans
            i18nKey={t("translation:neftie_leaderboards", {
              slug: selectedNeftie?.name || slug,
            })}
          />
        </strong>
      </h2>
      <h3 className="text-xl font-thin mt-3">
        <Trans
          i18nKey={t("translation:neftie_leaderboard_desc", {
            slug: selectedNeftie?.name || slug,
          })}
        />
      </h3>

      <div className="mt-12 flex gap-4">
        <Link
          href="/nefties"
          className="cursor-pointer pb-1 hover:border-b-2 border-[#d0364f] font-bold"
        >
          Nefties
        </Link>
        <div className="pb-1 border-b-2 border-[#d0364f] font-bold text-[#d0364f]">
          Leaderboards
        </div>
      </div>

      <div className="mt-8 text-sm flex items-center">
        Filter:
        <DropdownMenu>
          <DropdownMenuTrigger className="border px-2 py-1 rounded-sm ml-4 flex items-center gap-2">
            {selectedNeftie ? (
              <>
                <img
                  src={`/images/nefties/${selectedNeftie.slug}.png`}
                  alt={selectedNeftie.name}
                  className="w-5"
                />
                {selectedNeftie.name}
              </>
            ) : (
              "Select a Neftie"
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[250px] overflow-y-auto no-scrollbar">
            {nefties.map((neftie) => (
              <DropdownMenuLabel
                key={neftie.slug}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Link
                  href={`/neftie-leaderboards/${neftie.slug}`}
                  className="flex items-center gap-2"
                >
                  <img
                    src={`/images/nefties/${neftie.slug}.png`}
                    alt={neftie.name}
                    className="w-5"
                  />
                  {neftie.name}
                </Link>
              </DropdownMenuLabel>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="py-6 mt-4 rounded-md bg-white/25 animate-pulse h-32" />
      ) : (
        <>
          {topPlayers.length > 0 && (
            <div className="py-6 mt-4 rounded-md gap-6 p-4 bg-white/5 relative">
              <div className="flex gap-4 items-center">
                <div className="w-[80px] h-[80px] flex items-center justify-center bg-[#d66182]/40 rounded-md text-3xl font-dosis">
                  #1
                </div>
                <div>
                  {topPlayers[0].selectedAurorian ? (
                    <img
                      src={`${auroryCdnUrl}${topPlayers[0].selectedAurorian.details.attributes.Sequence}.png`}
                      className="w-[80px] h-[80px] object-cover rounded-md"
                      alt="Player avatar"
                    />
                  ) : (
                    <div className="rounded-md bg-black w-[80px] h-[80px]" />
                  )}
                  {/* <img
                    src={topPlayers[0].avatar}
                    className="w-[80px] h-[80px] object-cover rounded-md"
                  /> */}
                </div>
                <div>
                  <div className="text-[25px] font-bold font-dosis hover:underline">
                    <Link href={`/player/${topPlayers[0].slug}`}>
                      {topPlayers[0].username}
                    </Link>
                  </div>
                  <div className="p-2 bg-white/5 rounded-sm mt-2">
                    <div className="flex gap-2 text-xs font-bold uppercase font-dosis">
                      <div className="border-r pr-2 border-white/15 flex flex-col items-center">
                        <span>{topPlayers[0].total_matches}</span>
                        <span>Matches</span>
                      </div>
                      <div className="border-r pr-2 border-white/15 text-[#bcffb0] flex flex-col items-center">
                        <span>{topPlayers[0].wins}</span>
                        Wins
                      </div>
                      <div className="text-[#ff7b7b] flex flex-col items-center">
                        <span>{topPlayers[0].losses}</span>
                        Losses
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selectedNeftie && (
                <img
                  src={`/images/nefties/${selectedNeftie.name.toLowerCase().replace(/\s+/g, "-")}.png`}
                  alt={selectedNeftie.name}
                  className="max-w-[200px] absolute right-0 -top-14"
                />
              )}
            </div>
          )}

          <div className="grid grid-cols-3 mt-4 gap-2">
            {topPlayers.slice(1, 10).map((player, index) => (
              <div
                key={player.player_id}
                className="bg-white/5 rounded-md p-4 flex gap-4 items-center"
              >
                <div className="w-[30px] h-[30px] flex items-center justify-center bg-[#d66182]/40 rounded-md text-xl font-dosis">
                  #{index + 2}
                </div>
                {player.selectedAurorian ? (
                  <img
                    src={`${auroryCdnUrl}${player.selectedAurorian.details.attributes.Sequence}.png`}
                    className="w-[80px] h-[80px] object-cover rounded-md"
                    alt="Player avatar"
                  />
                ) : (
                  <div className="rounded-full bg-black/30 w-[80px] h-[80px]" />
                )}
                <div>
                  <div className="text-[20px] font-bold font-dosis hover:underline">
                    <Link href={`/player/${player.slug}`}>
                      {player.username}
                    </Link>
                  </div>
                  <div className="p-2 bg-white/5 rounded-sm mt-2">
                    <div className="flex gap-2 text-xs font-bold uppercase font-dosis">
                      <div className="border-r pr-2 border-white/15 flex flex-col items-center">
                        <span>{player.total_matches}</span>
                        <span>Matches</span>
                      </div>
                      <div className="border-r pr-2 border-white/15 text-[#bcffb0] flex flex-col items-center">
                        <span>{player.wins}</span>
                        Wins
                      </div>
                      <div className="text-[#ff7b7b] flex flex-col items-center">
                        <span>{player.losses}</span>
                        Losses
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NeftieLeaderboards;
