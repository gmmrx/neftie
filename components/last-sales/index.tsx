"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BarChart, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuryIcon from "/public/images/aury-icon.svg";

export const LastNeftieSales = () => {
  const [lastSales, setLastSales] = useState([]);

  const fetchSalesData = useCallback(async () => {
    try {
      const getLastSales = await axios.get("/api/last-sales");
      setLastSales(getLastSales.data.data);
    } catch (error) {
      console.error("Error during polling: ", error);
    }
  }, []);
  useEffect(() => {
    const setSalesData = async () => {
      await fetchSalesData();
    };
    setSalesData();
  }, [fetchSalesData]);
  const getStarCount = (rarity: string) => {
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
        {[...Array(totalStars)].map((_, index) =>
          index < filledStars ? (
            <Star key={index} size={14} fill={"currentColor"} /> // filled star
          ) : (
            <Star key={index} size={14} /> // empty star
          )
        )}
      </div>
    );
  };
  return (
    <div className="overflow-x-auto w-full lg:w-[60%] p-[0.2rem] bg-black rounded-md mt-4 pl-4 pt-4">
      <div className="text-[1.4rem] mb-1 font-medium flex justify-between">
        Latest Neftie Sales{" "}
        <div className="pr-4 text-sm">
          <a
            href="https://x.com/neftiesales"
            target="_blank"
            className="border border-white p-1 px-2 rounded-md"
          >
            Follow on X
          </a>
        </div>
      </div>
      <div className="lg:max-h-[12.8125rem] overflow-y-auto no-scrollbar">
        <table className="min-w-full bg-black border-separate border-spacing-[1rem]">
          <thead className="sticky top-0 bg-black">
            <tr>
              <th className="py-2 px-4 text-center text-sm font-medium text-gray-500"></th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                LEVEL
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                RARITY
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">
                PRICE
              </th>
              <th className="py-2 px-1 text-left text-sm font-medium text-gray-500">
                STATS
              </th>
            </tr>
          </thead>
          <tbody>
            {lastSales &&
              lastSales.length > 0 &&
              lastSales.map((lastSale: any) => {
                return (
                  <tr
                    key={lastSale.item_id}
                    className="text-sm text-gray-500 hover:bg-gray"
                  >
                    <td className="flex items-center gap-2 pt-1">
                      <div
                        style={{
                          backgroundImage: `url(${lastSale.image_mini})`,
                        }}
                        className="w-[30px] h-[30px] object-cover bg-center  bg-[length:150%_170%] rounded-md"
                      />
                      <span className="">{lastSale.collection.name}</span>
                    </td>
                    <td className="text-xs font-medium text-left px-4">
                      LEVEL {lastSale.level}
                    </td>
                    <td>
                      <StarsDisplay
                        rarity={lastSale.generated_attributes.rarity.toLowerCase()}
                      />
                    </td>
                    <td className="font-medium items-start gap-3  pl-4">
                      <div className="flex items-center gap-3">
                        {lastSale.unit_price / 1e9} <img src={AuryIcon.src} />
                      </div>
                    </td>
                    <td className="font-medium pl-3 cursor-pointer">
                      <StatDialog
                        generated_attributes={lastSale.generated_attributes}
                      />
                    </td>
                  </tr>
                );
              })}
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
      <DialogContent className="sm:max-w-[425px]">
        <div className="">
          <h2 className="text-lg mb-2 font-medium">Stats:</h2>
          <div className="p-4 bg-black text-sm font-bold">
            <div>Health: {generated_attributes.BLITZ.hp}</div>
            <div>Attack: {generated_attributes.BLITZ.atk}</div>
            <div>Defense: {generated_attributes.BLITZ.def}</div>
            <div>Speed: {generated_attributes.BLITZ.speed}</div>
          </div>

          <h2 className="text-lg mb-2 mt-4 font-medium">DNA Stats:</h2>
          <div className="p-4 bg-black text-sm font-bold">
            <div>
              Health: {generated_attributes.BLITZ.base_stat_percentiles.hp}/100
            </div>
            <div>
              Attack: {generated_attributes.BLITZ.base_stat_percentiles.atk}/100
            </div>
            <div>
              Defense: {generated_attributes.BLITZ.base_stat_percentiles.def}
              /100
            </div>
            <div>
              Speed: {generated_attributes.BLITZ.base_stat_percentiles.speed}
              /100
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LastNeftieSales;
