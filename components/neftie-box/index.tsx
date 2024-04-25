"use client";
/* eslint-disable @next/next/no-img-element */
import { Neftie } from "@/lib/data/nefties";
import Link from "next/link";
import React, { useState, FC } from "react";

const NeftieBox: FC<{ neftie: Neftie }> = ({ neftie }) => {
  if (!neftie) return null;
  const url = neftie.image;
  return (
    <Link href={`/neftie/${neftie.slug}`}>
      <div className="ml-4 p-4 max-w-[150px] rounded-sm w-full text-center border w-[150px] h-[155px] cursor-pointer hover:border-[#4d4d4d] transition-all relative">
        <div
          style={{ backgroundImage: `url(${url})` }}
          className="rounded-full absolute w-[20px] h-[20px] top-2 left-2 border bg-[length:150px_173px] bg-[8%_6%]"
        />
        <div className="flex flex-col relative">
          <div
            style={{ backgroundImage: `url(${url})` }}
            className={`rounded-full w-[80px] h-[80px] object-cover mx-auto bg-center bg-[length:170%_180%]`}
          />
          <div className="font-medium mt-4">{neftie.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default NeftieBox;
