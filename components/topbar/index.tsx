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

  return <div className="w-full bg-black h-[80px]"></div>;
};

export default Topbar;
