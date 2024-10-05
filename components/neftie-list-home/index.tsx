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
        console.log(neftie.element);

        // Determine the background based on the element
        const getElementBackground = (element) => {
          switch (element.toLowerCase()) {
            case "lightning":
              return "hover:bg-lightningGradient";
            case "plant":
              return "hover:bg-plantGradient";
            case "earth":
              return "hover:bg-earthGradient";
            case "water":
              return "hover:bg-waterGradient";
            case "air":
              return "hover:bg-airGradient";
            case "fire":
              return "hover:bg-gradient-to-r from-red-500 to-orange-500";
            default:
              return "bg-gray-500"; // Default background if element doesn't match
          }
        };

        return (
          <NeftieBox
            key={neftie.name}
            neftie={neftie}
            hideName={true}
            className={`${getElementBackground(neftie.element)} !p-[0.3rem] !bg-[#fff]/20 border-0 text-sm uppercase text-white hover:opacity-100`}
          />
        );
      })}
    </>
  );
};

export default NeftieListHome;
