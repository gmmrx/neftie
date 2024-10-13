"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import CreateNewPage from "./create-new-page";

const WikiHome = () => {
  const { t } = useTranslation();
  const [isCreatePageOpened, setIsCreatePageOpened] = useState<boolean>(true);
  return (
    <div className="w-full">
      {isCreatePageOpened ? (
        <CreateNewPage />
      ) : (
        <div className="w-full">
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
          <Button
            className="mt-4 ml-auto"
            onClick={() => setIsCreatePageOpened(true)}
          >
            {t("wiki:create_page.title")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WikiHome;
