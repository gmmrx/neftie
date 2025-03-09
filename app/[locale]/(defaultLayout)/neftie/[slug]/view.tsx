"use client";

import VideoTooltip from "@/components/video-tooltip";
import { findNeftiesByElement } from "@/lib/data/elements";
import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import AuryIcon from "/public/images/aury-icon.svg";
import Link from "next/link";
import { useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type UserProfileProps = {
  slug: string | undefined;
  videos: string[];
  counterData: any;
  skins: any[];
};
export const toBigNumber = (n: any) => new BigNumber(n);

const SingleNeftie: NextPage<UserProfileProps> = ({
  slug,
  videos,
  counterData,
  skins,
}) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const [selectedTab, setSelectedTab] = useState("abilities");
  const [isElementalView, setElementalView] = useState(false);
  const neftie = nefties.find((neftie) => neftie.slug === slug);

  const rawToAury = (rawPrice) => {
    // If no price or invalid price, return 0
    if (!rawPrice || isNaN(rawPrice)) return "0";

    // Assuming AURY_DECIMALS is 10^9 (common for many tokens)
    // If your token has a different decimal places, adjust this value
    const AURY_DECIMALS = 1e9; // 10^9

    // Convert to AURY and format to 2 decimal places
    const auryPrice = (rawPrice / AURY_DECIMALS).toFixed(2);

    return auryPrice;
  };

  const getNeftieVsResults = useMemo(() => {
    if (!neftie) return null;
    const neftieElement = neftie.element;

    const result = findNeftiesByElement(neftieElement, nefties);
    return result;
  }, [neftie, nefties]);
  if (nefties.length > 0 && !neftie) {
    return (
      <div className="text-center pt-10 text-xl font-semibold">
        {t("translation:errors.cant_found_neftie")}
      </div>
    );
  }
  const highestNeftieStat = Math.max(
    neftie?.hp_max ?? 0,
    neftie?.atk_max ?? 0,
    neftie?.def_max ?? 0,
    neftie?.speed_max ?? 0
  );

  if (nefties.length === 0) return null;
  const url = neftie?.image;
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 max-w-[1100px] mx-auto w-full min-h-[calc(100vh-191px)]">
      <div className="w-full rounded-md p-4 pb-5 flex flex-col lg:flex-row flex-wrap lg:justify-start justify-center gap-4 items-start w-full bg-white/10 relative mt-4 mb-12">
        <div
          style={{
            backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
          }}
          className={`rounded-md w-[200px] h-[200px] bg-transparent object-cover bg-center bg-[length:95%_95%] bg-no-repeat lg:absolute lg:-top-12 lg:left-0 mx-auto `}
        />
        <div className="lg:pl-[200px]">
          <div className="uppercase text-2xl">{neftie?.name}</div>
          <div className="font-thin text-xs my-2">
            {t("translation:element").toUpperCase()}:{" "}
            <span className="font-normal">
              {t(`translation:elements.${neftie?.element}`).toUpperCase()}
            </span>
          </div>
          <div className="font-normal mt-1 text-sm max-w-[600px] text-[#c7c7c7]">
            {t(`nefties:${neftie?.description}`)}
          </div>
        </div>
      </div>
      <div className="mt-12 flex gap-4 flex-nowrap overflow-x-scroll no-scrollbar">
        <div
          className={`pb-1 border-[#d0364f] cursor-pointer hover:border-b-[3px] font-bold ${selectedTab === "abilities" ? " border-b-[3px] text-[#d0364f]" : ""}`}
          onClick={() => setSelectedTab("abilities")}
        >
          Abilities
        </div>
        <div
          className={`cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f] font-bold ${selectedTab === "stats" ? " border-b-[3px] text-[#d0364f]" : ""} whitespace-nowrap`}
          onClick={() => setSelectedTab("stats")}
        >
          {" "}
          Base Stats
        </div>
        <div
          className={`cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f] font-bold ${selectedTab === "counters" ? " border-b-[3px] text-[#d0364f]" : ""}`}
          onClick={() => setSelectedTab("counters")}
        >
          {" "}
          Counters
        </div>
        <div
          className={`cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f] font-bold ${selectedTab === "skins" ? " border-b-[3px] text-[#d0364f]" : ""}`}
          onClick={() => setSelectedTab("skins")}
        >
          {" "}
          Skins
        </div>
      </div>
      {selectedTab === "abilities" && (
        <div className="skills grid md:grid-cols-2 lg:grid-cols-2 gap-2 my-6 justify-center">
          {neftie?.skills.map((skill, index) => {
            const videoUrl = videos && videos.length > 0 && videos[index];
            const skills = t(`nefties:${neftie?.slug}.skills`, {
              returnObjects: true,
            });

            // Check if this is the last item and if the total count is 5
            const isLastItemOfFive =
              index === neftie?.skills.length - 1 &&
              neftie?.skills.length === 5;

            return (
              <Dialog key={skill.description}>
                <DialogTrigger asChild>
                  <div
                    className={`w-full rounded-md p-4 mb-4 bg-white/10 relative flex justify-between items-start cursor-pointer group my-8 ${
                      isLastItemOfFive ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                    key={skill.description}
                  >
                    <div className="font-semibold text-base flex items-center justify-center gap-2 max-w-[100%] w-full">
                      {" "}
                      <img
                        src={skill.icon}
                        className="max-w-[50px] absolute -top-6 left-[50%] -translate-x-[50%] bg-black border border-[#272727] p-2 rounded-md"
                      />
                      <div className="text-center mt-4">
                        {skills && skills.length > 0 && skills[index].name}
                        <div className="font-normal text-xs mt-2 text-[#c7c7c7] transition-all">
                          {skills &&
                            skills.length > 0 &&
                            skills[index].description}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm flex gap-2 lowercase p-1 rounded-sm px-2 h-[30px] w-[60px] absolute right-3">
                      <img
                        src="/images/hype.png"
                        alt="Hype"
                        className="w-[18px] h-[18px]"
                      />
                      <span
                        className=""
                        style={{ fontVariant: "all-small-caps" }}
                      >
                        {skill?.hype}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>

                {videoUrl && <VideoComponent videoUrl={videoUrl} />}
              </Dialog>
            );
          })}
        </div>
      )}

      {selectedTab === "stats" && (
        <div className="flex flex-col gap-2 relative top-3 mt-8 mb-12">
          {/* HP Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">HP</span>
            <div className="h-[30px] w-[calc(100%-100px)] ml-2 bg-white/20 rounded-sm relative">
              <div
                className="h-full bg-red-500 rounded-sm transition-all duration-300"
                style={{
                  width: `${(neftie.hp_max / highestNeftieStat) * 100}%`,
                }}
              />
            </div>
            <span className="ml-2 text-xs w-14">
              <div className="flex items-center">
                <span className="font-thin w-[30px] text-left">MIN:</span>{" "}
                {neftie.hp_min}{" "}
              </div>
              <div>
                <span className="font-thin text-left">MAX:</span>{" "}
                {neftie.hp_max}{" "}
              </div>
            </span>
          </div>

          {/* ATK Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">ATK</span>
            <div className="h-[30px] w-[calc(100%-100px)] ml-2 bg-white/20 rounded-sm relative">
              <div
                className="h-full bg-orange-500 rounded-sm transition-all duration-300"
                style={{
                  width: `${(neftie.atk_max / highestNeftieStat) * 100}%`,
                }}
              />
            </div>
            <span className="ml-2 text-xs w-14">
              <div className="flex items-center">
                <span className="font-thin w-[30px] text-left">MIN:</span>{" "}
                {neftie.atk_min}{" "}
              </div>
              <div>
                <span className="font-thin text-left">MAX:</span>{" "}
                {neftie.atk_max}{" "}
              </div>
            </span>
          </div>

          {/* DEF Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">DEF</span>
            <div className="h-[30px] w-[calc(100%-100px)] ml-2 bg-white/20 rounded-sm relative">
              <div
                className="h-full bg-blue-500 rounded-sm transition-all duration-300"
                style={{
                  width: `${(neftie.def_max / highestNeftieStat) * 100}%`,
                }}
              />
            </div>
            <span className="ml-2 text-xs w-14">
              <div className="flex items-center">
                <span className="font-thin w-[30px] text-left">MIN:</span>{" "}
                {neftie.def_min}{" "}
              </div>
              <div>
                <span className="font-thin text-left">MAX:</span>{" "}
                {neftie.def_max}{" "}
              </div>
            </span>
          </div>

          {/* Speed Bar */}
          <div className="flex items-center text-sm my-1">
            <span className="w-8">SP</span>
            <div className="h-[30px] w-[calc(100%-100px)] ml-2 bg-white/20 rounded-sm relative">
              <div
                className="h-full bg-green-500 rounded-sm transition-all duration-300"
                style={{
                  width: `${(neftie?.speed_max / highestNeftieStat) * 100}%`,
                }}
              />
            </div>
            <span className="ml-2 text-xs w-14">
              <div className="flex items-center">
                <span className="font-thin w-[30px] text-left">MIN:</span>{" "}
                {neftie.speed_min}{" "}
              </div>
              <div>
                <span className="font-thin text-left">MAX:</span>{" "}
                {neftie.speed_max}{" "}
              </div>
            </span>
          </div>
        </div>
      )}
      {selectedTab === "counters" && (
        <div className="vsat flex flex-col gap-8 flex-wrap mt-8">
          <div className="flex items-center space-x-2 ml-auto">
            <Switch
              id="airplane-mode"
              checked={isElementalView}
              onCheckedChange={(checked: boolean) => setElementalView(checked)}
            />
            <Label htmlFor="airplane-mode">Elemental View</Label>
          </div>
          <div className="flex w-full justify-between flex-col lg:flex-row">
            <div className="bg-white/10 p-4 rounded-md w-full lg:w-[48%]">
              <div className="">
                <div className="uppercase font-normal">
                  <span className="font-bold">Best</span> Picks
                </div>
                <div className="uppercase font-bold text-sm">
                  VS. <span className="italic">{neftie?.name}</span>
                </div>
              </div>
              <Table className="mt-4 border rounded-md">
                <TableHeader className="bg-black py-1">
                  <TableRow>
                    <TableHead className="w-1/2">Neftie</TableHead>
                    <TableHead>WR</TableHead>
                    <TableHead>DMG</TableHead>
                    <TableHead>Matches</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <>
                    {isElementalView ? (
                      <>
                        {getNeftieVsResults &&
                          getNeftieVsResults.bad &&
                          getNeftieVsResults?.bad.map((neftie) => {
                            return (
                              <TableRow
                                className="bg-black/30"
                                key={neftie.name}
                              >
                                <TableCell className="font-medium flex items-center gap-2">
                                  <div
                                    style={{
                                      backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
                                    }}
                                    className={`rounded-md w-[30px] h-[30px] bg-transparent object-cover bg-center bg-[length:95%_95%] bg-no-repeat `}
                                  />
                                  {neftie.name}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {counterData &&
                          counterData.weak_against &&
                          counterData.weak_against.length > 0 &&
                          counterData.weak_against.map((counter) => (
                            <TableRow
                              className="bg-black/30"
                              key={counter.neftie_name}
                            >
                              <TableCell className="font-medium flex items-center gap-2">
                                <div
                                  style={{
                                    backgroundImage: `url('/images/nefties/${counter.neftie_name.toLowerCase().replaceAll(" ", "-")}.png')`,
                                  }}
                                  className={`rounded-md w-[30px] h-[30px] bg-transparent object-cover bg-center bg-[length:95%_95%] bg-no-repeat `}
                                />
                                {counter.neftie_name}
                              </TableCell>
                              <TableCell>{counter.win_rate}</TableCell>
                              <TableCell>{counter.avg_damage_dealt}</TableCell>
                              <TableCell>{counter.match_count}</TableCell>
                            </TableRow>
                          ))}
                      </>
                    )}
                  </>
                </TableBody>
              </Table>
            </div>
            <div className="bg-white/10 p-4 rounded-md w-full mt-4 lg:mt-0 lg:w-[48%]">
              <div className="">
                <div className="uppercase font-normal">
                  <span className="font-bold">Worst</span> Picks
                </div>
                <div className="uppercase font-bold text-sm">
                  VS. <span className="italic">{neftie?.name}</span>
                </div>
              </div>
              <Table className="mt-4 border rounded-md">
                <TableHeader className="bg-black py-1">
                  <TableRow>
                    <TableHead className="w-1/2">Neftie</TableHead>
                    <TableHead>WR</TableHead>
                    <TableHead>DMG</TableHead>
                    <TableHead>Matches</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <>
                    {isElementalView ? (
                      <>
                        {getNeftieVsResults &&
                          getNeftieVsResults.good &&
                          getNeftieVsResults?.good.map((neftie) => {
                            return (
                              <TableRow
                                className="bg-black/30"
                                key={neftie.name}
                              >
                                <TableCell className="font-medium flex items-center gap-2">
                                  <div
                                    style={{
                                      backgroundImage: `url('/images/nefties/${neftie.slug}.png')`,
                                    }}
                                    className={`rounded-md w-[30px] h-[30px] bg-transparent object-cover bg-center bg-[length:95%_95%] bg-no-repeat `}
                                  />
                                  {neftie.name}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {counterData &&
                          counterData.counters &&
                          counterData.counters.length > 0 &&
                          counterData.counters.map((counter) => (
                            <TableRow
                              className="bg-black/30"
                              key={counter.neftie_name}
                            >
                              <TableCell className="font-medium flex items-center gap-2">
                                <div
                                  style={{
                                    backgroundImage: `url('/images/nefties/${counter.neftie_name.toLowerCase().replaceAll(" ", "-")}.png')`,
                                  }}
                                  className={`rounded-md w-[30px] h-[30px] bg-transparent object-cover bg-center bg-[length:95%_95%] bg-no-repeat `}
                                />
                                {counter.neftie_name}
                              </TableCell>
                              <TableCell>{counter.win_rate}</TableCell>
                              <TableCell>{counter.avg_damage_dealt}</TableCell>
                              <TableCell>{counter.match_count}</TableCell>
                            </TableRow>
                          ))}
                      </>
                    )}
                  </>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "skins" && (
        <div className="flex items-center gap-4 mt-8">
          {skins &&
            skins.length > 0 &&
            skins.map((skin) => {
              return (
                <Link
                  key={skin.id}
                  href={`https://app.aurory.io/marketplace/item/${skin.id}`}
                  target="_blank"
                >
                  <div key={skin.id} className="relative">
                    <img
                      src={skin.image_mini}
                      alt={skin.name}
                      className="w-[200px] rounded-md"
                    />
                    <div className="absolute bottom-0 bg-black/50 w-full p-2 flex justify-between text-sm">
                      {skin.collection.name}{" "}
                      <span className="flex items-center gap-2">
                        {rawToAury(skin.best_listing_price)}{" "}
                        <img src={AuryIcon.src} alt="aury" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};
const VideoComponent = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true); // Track if the video is loading

  return (
    <DialogContent className="w-full lg:max-w-[800px] h-full rounded-md">
      {isLoading && (
        <div className="flex justify-center items-center h-[480px] w-full">
          {/* Loading spinner or placeholder */}
          <div className="loader" /> {/* You can use a CSS spinner here */}
          <p>Loading...</p> {/* Optional loading text */}
        </div>
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="h-[480px] w-full"
          onLoadStart={() => setIsLoading(true)} // Set loading state to true when loading starts
          onLoadedData={() => setIsLoading(false)} // Set loading state to false when the video is loaded
          style={{ display: isLoading ? "none" : "block" }} // Hide video until it's loaded
        />
      )}
    </DialogContent>
  );
};

export default SingleNeftie;
