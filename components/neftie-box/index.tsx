"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import Link from "next/link";
import React, { useState, FC } from "react";

const NeftieBox: FC<{
  neftie: Neftie;
  className?: string;
  hideName?: boolean;
}> = ({ neftie, className, hideName = false }) => {
  if (!neftie) return null;

  // Determine the background based on the element
  const getElementBackground = (element) => {
    switch (element.toLowerCase()) {
      case "lightning":
        return "bg-lightningGradient";
      case "plant":
        return "bg-plantGradient";
      case "earth":
        return "bg-earthGradient";
      case "water":
        return "bg-waterGradient";
      case "air":
        return "bg-airGradient";
      case "fire":
        return "bg-gradient-to-r from-red-500 to-orange-500";
      default:
        return "bg-gray-500"; // Default background if element doesn't match
    }
  };
  return (
    <Link href={`/neftie/${neftie.slug}`}>
      <div
        className={`p-4 max-w-[135px] bg-[#000] rounded-sm w-full text-center cursor-pointer hover:scale-[1.2] transition-all relative ${className}`}
      >
        <div className="flex flex-col relative">
          <div
            style={{
              backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
            }}
            className={`rounded-sm w-[80px] h-[80px] p-2 object-cover mr-auto mx-auto bg-center bg-[length:100%_100%] bg-no-repeat `}
          />
        </div>
        {!hideName && (
          <div className="font-medium text-sm mt-3">{neftie.name}</div>
        )}
      </div>
    </Link>
  );
};

export default NeftieBox;
