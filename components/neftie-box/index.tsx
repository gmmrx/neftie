"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import Link from "next/link";
import React, { useState, FC } from "react";

const NeftieBox: FC<{ neftie: Neftie; className?: string }> = ({
  neftie,
  className,
}) => {
  if (!neftie) return null;
  const url = neftie.image;
  return (
    <Link href={`/neftie/${neftie.slug}`}>
      <div
        className={`p-4 max-w-[155px] rounded-sm w-full text-center border w-[155px] h-[140px] cursor-pointer hover:border-[#4d4d4d] hover:scale-110 transition-all relative bg-[#27272a] ${className}`}
      >
        <div
          style={{ backgroundImage: `url(${url})` }}
          className="rounded-full absolute w-[20px] h-[20px] top-2 left-2 border bg-[length:150px_173px] bg-[8%_6%]"
        />
        <div className="flex flex-col relative">
          <div
            style={{ backgroundImage: `url(${url})` }}
            className={`rounded-full w-[80px] h-[80px] object-cover mx-auto bg-center bg-[length:170%_180%]`}
          />
          <div className="font-medium mt-1">{neftie.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default NeftieBox;
