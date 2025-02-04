"use client";

/* eslint-disable @next/next/no-img-element */

import React, { FC, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useNefties } from "@/providers/NeftiesProvider";
import Link from "next/link";

const auroryCdnUrl =
  "https://aurorians.cdn.aurory.io/aurorians-v2/current/images/mini/";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const HomeSearch: FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [neftieResults, setNeftieResults] = useState<any[]>([]);
  const [playerResults, setPlayerResults] = useState<any[]>([]);
  const { nefties } = useNefties();

  const debouncedSearchTerm = useDebounce(searchText, 300);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setNeftieResults([]);
      return;
    }

    const searchTermLower = debouncedSearchTerm.toLowerCase();
    const filteredNefties = nefties.filter((neftie) =>
      neftie.name.toLowerCase().includes(searchTermLower)
    );
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "/api/search-player?username=" + debouncedSearchTerm
        );
        const data = await response.json();

        setPlayerResults(data.data);
      } catch (error) {
        console.error("Error fetching latest battles:", error);
      } finally {
      }
    };

    fetchPlayers();
    setNeftieResults(filteredNefties.slice(0, 5));
  }, [debouncedSearchTerm, nefties]);

  return (
    <div className="w-full relative mb-8">
      <div className="search-box">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for players or nefties..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-10 pl-10 py-2 text-white bg-white/5 outline-none focus:outline-none rounded-md focus:ring-0 relative border border-white/5"
          />
        </div>
      </div>
      {searchText && (
        <div className="search-area absolute w-full bg-white/5 top-12 h-64 z-20 p-2 backdrop-blur-xl rounded-lg font-inter overflow-y-scroll no-scrollbar">
          <div className="list">
            <div className="font-dosis text-xs uppercase text-left border-b pt-1 pb-2 font-bold">
              PLAYERS
            </div>
            {playerResults &&
              playerResults.length > 0 &&
              playerResults.map((player, index) => (
                <div
                  className="list-el my-4 flex gap-2 cursor-pointer items-center"
                  key={index}
                >
                  <Link
                    href={`/player/${player.slug}`}
                    className="flex gap-2 cursor-pointer items-center"
                  >
                    {player.selectedAurorian ? (
                      <img
                        src={`${auroryCdnUrl}${player.selectedAurorian.details.attributes.Sequence}.png`}
                        className="w-10 rounded-full h-10 object-cover"
                        alt="Player avatar"
                      />
                    ) : (
                      <div className="rounded-full bg-black/30 w-10 h-10" />
                    )}

                    <div className="text-sm font-inter font-bold">
                      {player.username}
                    </div>
                  </Link>
                </div>
              ))}
          </div>

          <div className="list">
            <div className="font-dosis text-xs uppercase text-left border-b pt-1 pb-2 font-bold">
              NEFTIES
            </div>
            {neftieResults.map((neftie, index) => (
              <div
                key={index}
                className="list-el my-4 flex gap-2 cursor-pointer items-center"
              >
                <Link
                  href={`/neftie/${neftie.slug}`}
                  className="flex gap-2 cursor-pointer items-center"
                >
                  <div
                    style={{
                      backgroundImage: `url(/images/nefties/${neftie.name.toLowerCase().replace(" ", "-")}.png)`,
                    }}
                    className="w-[30px] h-[30px] bg-center bg-cover rounded-md"
                  />
                  <div className="text-sm font-inter font-bold">
                    {neftie.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
