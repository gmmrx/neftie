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
import Sidebar from "../sidebar";

const WikiSidebar = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  return <Sidebar />;
};

export default WikiSidebar;
