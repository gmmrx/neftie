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
    <Card className="w-full rounded-sm">
      <CardHeader>
        <CardTitle className="uppercase mb-4">{t('wiki:welcome_title')}</CardTitle>
        <CardDescription className="text-base">{t('wiki:welcome_desc')}</CardDescription>
      </CardHeader>
      
    </Card>
  );
};

export default WikiHome;
