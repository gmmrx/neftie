import React from "react";
import { intervalToDuration, format } from "date-fns";
import Link from "next/link";
import { useBosses } from "@/providers/BossesProvider";

function formatDuration(seconds) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const minutes = duration.minutes || 0;
  const secs = duration.seconds || 0;
  return `${minutes} min ${secs} sec`;
}

const MatchHistoryBox = ({ match }) => {
  const { bosses } = useBosses();
  console.log(match);
  const generateOpponentImage = () => {
    switch (match.type) {
      case "Boss":
        const findBoss = bosses.BOSS.find(
          (boss) => boss.neftie === match.player2.team[0].type.toLowerCase()
        );
        return findBoss
          ? `/images/bosses/${findBoss.name.toLowerCase().replace(/\s+/g, "-")}.png`
          : "";
      case "Elite":
        return `/images/bosses/elite-${match.player2.team[0].type.toLowerCase().replace(/\s+/g, "-")}.png`;
      default:
        return `/images/nefties/${match.player2.team[0].type.toLowerCase().replace(/\s+/g, "-")}.png`;
    }
  };

  const generateOpponentName = () => {
    switch (match.type) {
      case "Boss":
        const findBoss = bosses.BOSS.find(
          (boss) => boss.neftie === match.player2.team[0].type.toLowerCase()
        );
        return findBoss ? findBoss.name : "";

      case "Elite":
        return `Elite ${match.player2.team[0].type}`;
      case "PvE":
        return `Computer`;
      default:
        return match?.player2?.username;
    }
  };

  return (
    <div className="w-full mt-[1.625rem] bg-white/5 h-[7.5rem] flex relative justify-between items-center px-4 rounded-[0.5rem] relative ">
      <div
        className={`absolute w-[4px] h-[54px] top-[50%] -translate-y-[50%] left-0 rounded-tr-md rounded-br-md ${match?.player1?.winner ? "bg-[#20C812]" : "bg-[#E9213D]"}`}
      />
      <div
        className={`absolute w-[4px] h-[54px] top-[50%] -translate-y-[50%] right-0 rounded-tl-md rounded-bl-md  ${match?.player2?.winner ? "bg-[#20C812]" : "bg-[#E9213D]"}`}
      />
      <div className="w-[9.25rem] flex flex-col gap-2">
        <Link href={`/player/${match?.player1?.slug}`}>
          <span className="font-inter font-semibold text-[1rem]">
            {match?.player1?.username}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {match?.player1?.team.map((neftie) => (
            <div key={neftie.id}>
              <img
                src={`/images/nefties/${neftie.type.toLowerCase().replace(/\s+/g, "-")}.png`}
                alt={neftie.type}
                className="w-[40px] h-[40px] p-1 bg-black/20 border rounded-sm border-white/20"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center flex-col gap-1 relative">
        <img
          src={"/images/battle-icon.svg"}
          alt="Battle Icon"
          className="w-[1.8125rem] -mt-4"
        />
        <div className="font-inter font-medium text-base text-[#D6D3D1]">
          {formatDuration(match?.duration)}
        </div>
        <div className="font-inter text-sm text-[#78716C]">
          {format(match?.battle_detail?.createdAt, "dd MMM yyyy hh:mm")}
        </div>
        <div className="mt-auto bg-black/25 absolute -bottom-[1.8rem] font-inter font-semibold text-[0.75rem] text-[#A8A29E] w-[91px] text-center pt-1 rounded-tr-md rounded-tl-md">
          {match.type}
        </div>
      </div>
      <div className="w-[9.25rem] flex flex-col gap-2">
        <Link href={`/player/${match?.player2?.slug}`}>
          <span className="font-inter font-semibold text-[1rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
            {generateOpponentName()}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {match?.player2?.team.map((neftie) => (
            <div key={neftie.id}>
              <img
                src={generateOpponentImage()}
                alt={neftie.type}
                className="w-[40px] h-[40px] p-1 bg-black/20 border rounded-sm border-white/20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryBox;
