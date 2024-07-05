"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronLeft, SwatchBook, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LANGUAGE } from "@/lib/data/constants";
import { usePathname } from "next/navigation";

const WikiSidebar = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-[15rem] border-r font-ibmplex p-2">
      <div className="text-center text-2xl cursor-pointer p-2 flex justify-between items-center">
        <div>
          <strong> NEFTIE</strong>.APP
        </div>
        <div className="-mt-[2px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img
                src={`/images/flags/${i18n.language}.svg`}
                className="w-[20px]"
                alt={i18n.language}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {!session ? (
        <div
          onClick={() => signIn("discord")}
          className="bg-[#5d6af3] p-2 rounded-sm flex items-center gap-2 font-ibmplex justify-center font-semibold mt-3 mb-4 cursor-pointer text-xs"
        >
          <img src="/images/discord_logo.png" className="w-[20px]" />{" "}
          {t("translation:login_with_discord")}
        </div>
      ) : (
        <div
          className="bg-destructive p-2 rounded-sm flex items-center gap-2 font-ibmplex justify-center font-semibold text-xs mt-3 mb-4 cursor-pointer font-semibold"
          onClick={() => signOut()}
        >
          {t("translation:logout")}
        </div>
      )}
      <div className="mt-4 hidden lg:block">
        <Link href="/">
          <div className="text-base font-normal flex items-center gap-2 cursor-pointer hover:bg-secondary py-2 px-2 rounded-sm uppercase mb-6">
            <ChevronLeft size={18} /> {t("translation:back")}
          </div>
        </Link>
        <Link href="/wiki">
          <div className="text-base font-normal flex items-center gap-2 cursor-pointer hover:bg-secondary py-2 px-2 rounded-sm">
            Wiki Home
          </div>
        </Link>
      </div>
      <div className="lg:hidden">{/* <MobileMenu /> */}</div>
    </div>
  );
};

export default WikiSidebar;
