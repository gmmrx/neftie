"use client";
import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LayoutDashboard, Play, SwatchBook } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LANGUAGE } from "@/lib/data/constants";
import { usePathname } from "next/navigation";
import MobileMenu from "../mobile-menu";

const Topbar = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full bg-black h-[80px] pr-[4rem] flex justify-end items-center gap-8">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={`/images/flags/${i18n.language}.svg`}
              className="w-[20px]"
              alt={i18n.language}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black z-[10]">
            <>
              {LANGUAGE.map((lang) => {
                return (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={(e) => {
                      let newPath;
                      if (i18n.language !== "en") {
                        newPath = newPath = pathname.replace(
                          /^\/[a-z]{2}\/?/,
                          `/${lang.code}/`
                        );

                        i18n.changeLanguage(lang.code);
                        return router.push(newPath);
                      } else {
                        i18n.changeLanguage(lang.code);
                        return router.push(`/${lang.code}${pathname}`);
                      }
                    }}
                  >
                    <img
                      src={`/images/flags/${lang.code}.svg`}
                      className="w-[20px] mr-2"
                      alt={i18n.language}
                    />{" "}
                    {lang.value}
                  </DropdownMenuItem>
                );
              })}
            </>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-8 w-full max-w-[200px]">
        {!session ? (
          <div
            onClick={() => signIn("discord")}
            className="bg-[#5d6af3] p-2 w-full flex items-center gap-3 font-ibmplex justify-center font-semibold cursor-pointer rounded-sm text-xs h-[46px]"
          >
            <img src="/images/discord_logo.png" className="w-[20px]" />{" "}
            {t("translation:login_with_discord")}
          </div>
        ) : (
          <div
            className="bg-destructive p-2 flex w-full items-center gap-3 font-ibmplex justify-center rounded-sm h-[46px] font-semibold text-xs cursor-pointer font-semibold"
            onClick={() => signOut()}
          >
            {t("translation:logout")}
          </div>
        )}

        {session && session.user.isAdmin && (
          <Link href="/admin">
            <div className="text-base font-normal flex items-center gap-3 cursor-pointer hover:bg-secondary py-2 px-2">
              Adm
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;