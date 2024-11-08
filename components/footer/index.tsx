"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  Github,
  Twitter,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full bg-black mt-8 lg:h-[80px] lg:pl-[11rem] py-4 lg:py-0 lg:pr-[4rem] flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-8">
      <div>
        <img src={"/images/footer-logo.png"} className="max-w-[100px]" />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
        <div className="uppercase text-xs text-[#9e9e9e] cursor-pointer hover:text-white transition-all">
          <a href="/about-us">About Us</a>
        </div>
        <div className="uppercase text-xs text-[#9e9e9e] cursor-pointer hover:text-white transition-all">
          PrIvacy PolIcy
        </div>
        <div className="uppercase text-xs text-[#9e9e9e] cursor-pointer hover:text-white transition-all">
          Terms of ServIce
        </div>
        <div className="text-xs flex items-center gap-8 lg:justify-center lg:ml-auto text-[#9e9e9e]">
          <div className="flex gap-4">
            <a href="https://github.com/gmmrx/neftie" target="_blank">
              <Github size={18} />
            </a>
            <a href="https://x.com/neftiegg" target="_blank">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
