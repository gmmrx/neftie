"use client";
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { EventsAttributes } from "@/models/Events";
import Link from "next/link";

export const getStatus = (startsAt, endsAt) => {
  const now = new Date();
  if (now < new Date(startsAt)) return "INCOMING";
  if (now > new Date(endsAt)) return "FINISHED";
  return "ONGOING";
};

const EventBox: FC<{ event: EventsAttributes }> = ({ event }) => {
  const { t } = useTranslation();
  if (!event) return null;
  const totalPrize =
    event &&
    event.details.prizes.reduce(
      (sum, prize) => sum + parseFloat(prize.prize),
      0
    );
  const status = getStatus(event.startsAt, event.endsAt);
  return (
    <>
      <Link href={`/event/${event.slug}`}>
        <Card className="max-w-[350px] cursor-pointer mr-1">
          <CardHeader>
            <div className="flex flex-col items-start gap-4">
              <div>
                <CardTitle className="text-[1.2rem]">{event.name}</CardTitle>
                <div className="flex items-center mt-2">
                  <span
                    className={`px-2 py-1 rounded-sm leading-none text-[8px] font-semibold uppercase ${
                      status === "ONGOING"
                        ? "bg-green-100 text-green-800"
                        : status === "INCOMING"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t(`translation:${status.toLowerCase()}`)}
                  </span>
                </div>
                <CardDescription className="mt-4 flex gap-2 flex-col">
                  <div className="flex gap-2">
                    {t("translation:language")}:{" "}
                    <img
                      src={`/images/flags/${event.details.language}.svg`}
                      className="w-[20px]"
                      alt={"video locale"}
                    />
                  </div>
                  <div>
                    {t("translation:event_form.prizes")}:{" "}
                    <span className="text-white">
                      {totalPrize} ${event.details.prizes[0].currency}
                    </span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
};

export default EventBox;
