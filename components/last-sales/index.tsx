"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BarChart, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuryIcon from "/public/images/aury-icon.svg";
import { Skeleton } from "@/components/ui/skeleton";

export const LastNeftieSales = () => {
  const [lastSales, setLastSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSalesData = useCallback(async () => {
    try {
      const getLastSales = await axios.get("/api/last-sales");
      setLastSales(getLastSales.data.data);
    } catch (error) {
      console.error("Error during polling: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const setSalesData = async () => {
      await fetchSalesData();
    };
    setSalesData();
  }, [fetchSalesData]);

  const getStarCount = (rarity) => {
    switch (rarity) {
      case "legendary":
        return 5;
      case "epic":
        return 4;
      case "rare":
        return 3;
      case "uncommon":
        return 2;
      case "common":
        return 1;
      default:
        return 0;
    }
  };

  const StarsDisplay = ({ rarity }) => {
    const filledStars = getStarCount(rarity);
    const totalStars = 5;

    return (
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < filledStars ? "#FFD12F" : "#2c2c2c"}
            stroke={index < filledStars ? "#FFD12F" : "#2c2c2c"}
          />
        ))}
      </div>
    );
  };

  const SkeletonRow = () => (
    <tr className="text-sm text-gray-500 hover:bg-gray">
      <td className="flex items-center gap-2 pl-2 py-4 font-inter text-white text-[14px] font-semibold">
        <Skeleton className="w-[30px] h-[30px] rounded-md" />
        <Skeleton className="w-[100px] h-[16px] rounded-md" />
      </td>
      <td className="font-inter text-white text-[12px] font-bold text-left px-4">
        <Skeleton className="w-[40px] h-[16px] rounded-md" />
      </td>
      <td className="font-inter text-white text-[12px] font-bold">
        <Skeleton className="w-[60px] h-[16px] rounded-md" />
      </td>
      <td className="font-inter text-white text-[12px] font-bold items-start gap-3 pl-4">
        <Skeleton className="w-[60px] h-[16px] rounded-md" />
      </td>
      <td className="font-inter text-white text-[12px] font-bold pl-3">
        <Skeleton className="w-[24px] h-[24px] rounded-md" />
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto w-full p-[0.2rem] rounded-md mt-4 pt-4">
      <div className="text-base mb-4 font-medium flex font-inter justify-between">
        Latest Sales
        <div className="pr-4 text-sm">
          <a href="https://x.com/neftiesales" target="_blank">
            <img src={"/images/follow-x.png"} className="max-w-[6.125rem]" />
          </a>
        </div>
      </div>
      <div className="lg:max-h-[100%] overflow-y-auto no-scrollbar">
        <table className="min-w-full bg-white/5 rounded-[16px]">
          <thead className="sticky top-0 bg-[#717378]/10">
            <tr>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[14px] w-[250px]">
                Neftie
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                LEVEL
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                RARITY
              </th>
              <th className="py-4 px-4 text-left text-[#717378] font-inter font-bold text-[12px]">
                PRICE
              </th>
              <th className="py-4 px-1 text-left text-[#717378] font-inter font-bold text-[12px]">
                STATS
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <SkeletonRow key={index} />)
              : lastSales.map((lastSale) => (
                  <tr
                    key={lastSale.item_id}
                    className="text-sm text-gray-500 hover:bg-gray"
                  >
                    <td className="flex items-center gap-2 pl-2 py-4 font-inter text-white text-[14px] font-semibold">
                      <div
                        style={{
                          backgroundImage: `url(/images/nefties/${lastSale.name.toLowerCase().replace(" ", "-")}.png)`,
                        }}
                        className="w-[30px] h-[30px] bg-center bg-cover rounded-md"
                      />
                      <span>{lastSale.collection.name}</span>
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold text-left px-4">
                      LVL {lastSale.level}
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold">
                      <StarsDisplay
                        rarity={lastSale.generated_attributes.rarity.toLowerCase()}
                      />
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold items-start gap-3 pl-4">
                      <div className="flex items-center gap-3">
                        {lastSale.unit_price / 1e9} <img src={AuryIcon.src} />
                      </div>
                    </td>
                    <td className="font-inter text-white text-[12px] font-bold pl-3 cursor-pointer">
                      <StatDialog
                        generated_attributes={lastSale.generated_attributes}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function StatDialog({ generated_attributes }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BarChart />
      </DialogTrigger>
      <DialogContent>
        <h2>Stats:</h2>
        <div>
          <div>Health: {generated_attributes.BLITZ.hp}</div>
          <div>Attack: {generated_attributes.BLITZ.atk}</div>
          <div>Defense: {generated_attributes.BLITZ.def}</div>
          <div>Speed: {generated_attributes.BLITZ.speed}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LastNeftieSales;
