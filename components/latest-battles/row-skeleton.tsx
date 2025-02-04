"use client";

import React, { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LatestBattleSkeleton: FC = () => {
  return (
    <div className="w-full mt-[0.75rem] bg-white/5 h-[5.25rem] rounded-[1rem] flex items-center px-4 gap-[0.875rem] relative">
      <div className="absolute w-[4px] h-[29px] bg-[#E9213D] left-0 top-[50%] -translate-y-[50%] rounded-tr-[0.5rem] rounded-br-[0.5rem]" />

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[36px] h-[36px] rounded-[0.5rem]" />
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
          <Skeleton className="w-[24px] h-[24px] rounded-full" />
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
          <Skeleton className="w-[36px] h-[36px] rounded-[0.5rem]" />
        </div>
      </div>
    </div>
  );
};

export default LatestBattleSkeleton;
