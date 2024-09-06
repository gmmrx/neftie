"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const WikiHome = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader className="flex flex-row items-center gap-8">
          <img
            src={
              "https://images.cdn.aurory.io/consumables/hype-potion/rare.png"
            }
            className="max-w-[7rem]"
          />
          <div>
            <CardTitle className="uppercase mb-4">
              {t("wiki:welcome_title")}
            </CardTitle>
            <CardDescription className="text-base">
              {t("wiki:welcome_desc")}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default WikiHome;
