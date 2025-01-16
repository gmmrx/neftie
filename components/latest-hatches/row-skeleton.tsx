"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using shadcn's Skeleton

const LatestHatchRowSkeleton = () => {
  return (
    <div className="w-full mt-[0.75rem] bg-white/5 h-[5.25rem] rounded-[1rem] flex items-center px-4 gap-[0.875rem] relative">
      {/* Left Status Bar */}
      <div className="absolute w-[4px] h-[29px] bg-gray-700 left-0 top-[50%] -translate-y-[50%] rounded-tr-[0.5rem] rounded-br-[0.5rem]" />

      {/* Placeholder for Image */}
      <Skeleton className="w-[56px] h-[56px] rounded-md" />

      {/* Text Placeholders */}
      <div className="flex flex-col w-full gap-2">
        {/* Title and Stars */}
        <div className="flex items-center gap-3">
          <Skeleton className="w-[120px] h-[16px] rounded-md" />
          <div className="flex gap-[2px]">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[15px] h-[15px] rounded-full"
                />
              ))}
          </div>
        </div>

        {/* Egg Name and Time */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-[100px] h-[12px] rounded-md" />
          <Skeleton className="w-[60px] h-[12px] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default LatestHatchRowSkeleton;
