"use client";

/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from "react";
import LatestHatchRow from "./row";
import LatestHatchRowSkeleton from "./row-skeleton";
// Assuming you're using shadcn's Skeleton

interface HatchData {
  id: string;
  egg_name: string;
  egg_grade: string;
  neftie_name: string;
  neftie_grade: string;
  neftie_rarity: string;
  createdAt: string;
}

const LatestHatches: FC = () => {
  const [hatches, setHatches] = useState<HatchData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHatches = async () => {
      try {
        const response = await fetch("/api/last-hatches");
        const data = await response.json();
        setHatches(data);
      } catch (error) {
        console.error("Error fetching latest hatches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHatches();
  }, []);

  return (
    <div className="w-full mt-[1.625rem]">
      <div className="font-inter font-medium text-base">Latest Hatches</div>

      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => <LatestHatchRowSkeleton />)
        : hatches?.data?.map((hatch) => (
            <LatestHatchRow key={hatch.id} hatch={hatch} />
          ))}
    </div>
  );
};

export default LatestHatches;
