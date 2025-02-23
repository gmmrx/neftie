import React from "react";
import { BossesAttributes } from "@/models/Bosses";

interface BossCardProps {
  boss: BossesAttributes;
}

const BossCard: React.FC<BossCardProps> = ({ boss }) => {
  // Get the highest stat value for this boss to use as max
  const maxStat = Math.max(boss.hp, boss.atk, boss.def, boss.sp);

  // Calculate percentage relative to the highest stat
  const getProgressWidth = (value: number) => {
    return (value / maxStat) * 100;
  };

  return (
    <div className="w-full h-auto bg-white/5 rounded-sm relative mt-4 px-2 flex items-center border border-[#212121]">
      <img
        src={`/images/bosses/${boss.name.toLowerCase().replaceAll(" ", "-")}.png`}
        className=" max-w-[200px]"
        alt={boss.name}
      />
      <div className="w-full">
        <div className="ml-[7rem] text-center relative mb-4 -mt-[1.5rem] text-[24px]">{boss.name}</div>

        {/* Stats Container */}
        <div className="ml-[7rem] flex flex-col gap-2 relative top-3 mt-2">
          {/* HP Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">HP</span>
            <div className="h-[20px] w-[calc(100%-70px)] ml-2 bg-white/20 rounded-sm">
              <div
                className="h-full bg-red-500 rounded-sm transition-all duration-300"
                style={{ width: `${getProgressWidth(boss.hp)}%` }}
              />
            </div>
            <span className="ml-2 text-xs w-8">{boss.hp}</span>
          </div>

          {/* ATK Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">ATK</span>
            <div className="h-[20px] w-[calc(100%-70px)] ml-2 bg-white/20 rounded-sm">
              <div
                className="h-full bg-orange-500 rounded-sm transition-all duration-300"
                style={{ width: `${getProgressWidth(boss.atk)}%` }}
              />
            </div>
            <span className="ml-2 text-xs w-8">{boss.atk}</span>
          </div>

          {/* DEF Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">DEF</span>
            <div className="h-[20px] w-[calc(100%-70px)] ml-2 bg-white/20 rounded-sm">
              <div
                className="h-full bg-blue-500 rounded-sm transition-all duration-300"
                style={{ width: `${getProgressWidth(boss.def)}%` }}
              />
            </div>
            <span className="ml-2 text-xs w-8">{boss.def}</span>
          </div>

          {/* SP Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">SP</span>
            <div className="h-[20px] w-[calc(100%-70px)] ml-2 bg-white/20 rounded-sm">
              <div
                className="h-full bg-green-500 rounded-sm transition-all duration-300"
                style={{ width: `${getProgressWidth(boss.sp)}%` }}
              />
            </div>
            <span className="ml-2 text-xs w-8">{boss.sp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BossCard;
