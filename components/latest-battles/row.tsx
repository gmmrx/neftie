"use client";

/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SwordsIcon } from "lucide-react";
import Link from "next/link";

export const auroryCdnUrl =
  "https://aurorians.cdn.aurory.io/aurorians-v2/current/images/mini/";
const LatestBattleRow: FC = ({ battle }) => {
  const { t } = useTranslation();
  const player1 = battle.players[0];
  const player2 = battle.players[1];
  console.log(battle);
  const player1Aurorian = player1.selected_aurorian || null;
  const player2Aurorian = player2.selected_aurorian || null;

  const p1Won = player1.winner;

  return (
    <div className="w-full mt-[0.75rem] bg-white/5 h-[5.25rem] rounded-[1rem] flex items-center px-4 gap-[0.875rem] relative cursor-pointer hover:bg-white/10 transition-all transition-hover">
      <div
        className={`absolute w-[4px] h-[29px] ${p1Won ? "bg-[#20C812]" : "bg-[#E9213D]"} left-0 top-[50%] -translate-y-[50%] rounded-tr-[0.5rem] rounded-br-[0.5rem]`}
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          {player1Aurorian ? (
            <img
              src={`${auroryCdnUrl}${player1Aurorian.attributes.Sequence}.png`}
              className="max-w-[36px] rounded-[0.5rem] max-h-[36px]"
            />
          ) : (
            ""
          )}
          <Link href={`/player/${player1.slug}`}>
            <div
              className={`font-inter font-semibold text-base ${p1Won ? "text-[#20C812]" : "text-[#E9213D]"} overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]`}
            >
              {player1.username}
            </div>
          </Link>
          <div>
            <SwordsIcon />
          </div>
          <Link href={`/player/${player2.slug}`}>
            <div
              className={`font-inter font-semibold text-base ${p1Won ? "text-[#E9213D]" : "text-[#20C812]"} overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]`}
            >
              {player2.username}
            </div>
          </Link>
          {player2Aurorian ? (
            <img
              src={`${auroryCdnUrl}${player2Aurorian.attributes.Sequence}.png`}
              className="max-w-[36px] rounded-[0.5rem] max-h-[36px]"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestBattleRow;
