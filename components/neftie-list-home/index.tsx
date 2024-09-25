"use client";
/* eslint-disable @next/next/no-img-element */
import { useNefties } from "@/providers/NeftiesProvider";
import React, { FC } from "react";
import NeftieBox from "../neftie-box";

const NeftieListHome: FC = () => {
  const { nefties } = useNefties();
  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the array and select the first 6 random items
  const randomNefties = shuffleArray([...nefties]).slice(0, 7);

  return (
    <>
      {randomNefties.map((neftie) => {
        return (
          <NeftieBox
            key={neftie.name}
            neftie={neftie}
            hideName={true}
            className="!bg-[#2b2b2b]/80 border-0 text-sm uppercase text-white opacity-60 hover:opacity-100"
          />
        );
      })}
    </>
  );
};

export default NeftieListHome;
