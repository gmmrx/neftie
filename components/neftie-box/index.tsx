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
  const url = neftie.image;
  return (
    <Link href={`/neftie/${neftie.slug}`}>
      <div
        className={`p-0 max-w-[100px] rounded-sm w-full text-center cursor-pointer hover:scale-110 transition-all relative ${className}`}
      >
        <div className="flex flex-col relative">
          <div
            style={{ backgroundImage: `url(${url})` }}
            className={`rounded-sm w-[100px] h-[100px] object-cover mr-auto bg-center bg-[length:150%_170%]`}
          />
        </div>
      </div>
      {!hideName && (
        <div className="font-medium text-sm mt-3">{neftie.name}</div>
      )}
    </Link>
  );
};

export default NeftieBox;
