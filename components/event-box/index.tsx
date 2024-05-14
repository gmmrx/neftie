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
import { format } from "date-fns";

const getStatus = (startsAt, endsAt) => {
  const now = new Date();
  if (now < new Date(startsAt)) return "FUTURE";
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
  return (
    <Card className="max-w-[350px] cursor-pointer mr-1">
      <CardHeader>
        <div className="flex flex-col items-start gap-4">
          <div>
            <CardTitle>{event.name}</CardTitle>
            <CardDescription className="mt-4 flex gap-2 flex-wrap">
              {t("translation:language")}:{" "}
              <img
                src={`/images/flags/${event.details.language}.svg`}
                className="w-[20px] mr-2"
                alt={"video locale"}
              />
              {t("translation:event_form.prizes")}: {totalPrize} $
              {event.details.prizes[0].currency}
              <div>
                {t("translation:status")}:{" "}
                {getStatus(event.startsAt, event.endsAt)}
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default EventBox;
