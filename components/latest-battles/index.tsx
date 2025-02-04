"use client";

import React, { FC, useEffect, useState } from "react";
import LatestBattleRow from "./row";
import LatestBattleSkeleton from "./row-skeleton";

interface AurorianAttributes {
  [key: string]: string;
}

interface SelectedAurorian {
  id: string;
  name: string;
  type: string;
  attributes: AurorianAttributes;
  generated_attributes: {
    selected: boolean;
    skin_color: string;
  };
}

interface PlayerData {
  username: string;
  winner: boolean;
  selected_aurorian: SelectedAurorian | null;
}

interface BattleData {
  battle_id: string;
  battle_createdAt: string;
  players: PlayerData[];
}

const LatestBattles: FC = () => {
  const [battles, setBattles] = useState<BattleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const response = await fetch("/api/last-battles");
        const data = await response.json();

        setBattles(data.data);
      } catch (error) {
        console.error("Error fetching latest battles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBattles();
  }, []);

  return (
    <div className="w-full mt-[1.625rem]">
      <div className="font-inter font-medium text-base">Latest Battles</div>

      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => <LatestBattleSkeleton key={index} />)
        : battles?.map((battle) => (
            <LatestBattleRow key={battle.battle_id} battle={battle} />
          ))}
    </div>
  );
};

export default LatestBattles;
