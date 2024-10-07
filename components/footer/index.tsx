"use client";
import React, { useState, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Copyright,
  Github,
  LayoutDashboard,
  Play,
  SwatchBook,
  Twitter,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LANGUAGE } from "@/lib/data/constants";
import { usePathname } from "next/navigation";
import MobileMenu from "../mobile-menu";

const Footer = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full bg-black mt-8 h-[80px] pl-[11rem] pr-[4rem] flex justify-start items-center gap-8">
      <div>
        <img src={"/images/footer-logo.png"} className="max-w-[100px]" />
      </div>
      <div className="flex items-center gap-8 w-full">
        <div className="uppercase text-xs text-[#9e9e9e] cursor-pointer hover:text-white transition-all">
          About Us
        </div>
        <div className="uppercase text-xs text-[#9e9e9e] cursor-pointer hover:text-white transition-all">
          PrIvacy PolIcy
        </div>
        <div className="uppercase text-xs text-[#9e9e9e] cursor-pointer hover:text-white transition-all">
          Terms of ServIce
        </div>
        <div className="text-xs flex items-center gap-8 justify-center ml-auto text-[#9e9e9e]">
          <div className="flex gap-4">
            <a href="https://github.com/gmmrx/neftie" target="_blank">
              <Github size={18} />
            </a>
            <a href="https://x.com/neftieapp" target="_blank">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
