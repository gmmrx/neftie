"use client";

import CommunityTierListBox from "@/components/community-tier-list-box";
import WhatIsTierListBox from "@/components/what-is-tier-list";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import { ListPlus } from "lucide-react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const TierListNefties: NextPage = ({ data }) => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { data: session } = useSession();

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[84.5vh] max-w-[70rem] mx-auto">
      <WhatIsTierListBox type="community" />

      <div className="mt-12 flex gap-4 items-center flex-wrap">
        <div className="pb-1 hover:border-b-[3px]  border-[#d0364f] cursor-pointer font-bold ">
          <Link href="/tier-list">All</Link>
        </div>
        <div className="cursor-pointer pb-1  border-[#d0364f] hover:border-b-[3px] font-bold">
          {" "}
          <Link href="/tier-list/pvp">PvP</Link>
        </div>
        <div className="cursor-pointer pb-1 hover:border-b-[3px] border-[#d0364f]  font-bold">
          {" "}
          <Link href="/tier-list/pve">PvE</Link>
        </div>
        <div className="cursor-pointer pb-1 border-b-[3px] text-[#d0364f] border-[#d0364f]  font-bold">
          {" "}
          <Link href="/tier-list/community">Community</Link>
        </div>
        {session && session.user && session.user.isAuroryMember && (
          <Link
            href="/tier-list/new"
            className="ml-auto text-sm flex-1 lg:flex-0 w-full block lg:flex"
          >
            <div className="ml-auto flex gap-2 items-center border p-2 bg-[#9c2438] border-[#c32f48] rounded-sm">
              <ListPlus /> Create Your Tier List
            </div>
          </Link>
        )}
      </div>
      <div className="lg:max-h-[100%] overflow-y-auto no-scrollbar mt-8 mb-4">
        {data &&
          data.items &&
          data.items.length > 0 &&
          data.items.map((communityTierList) => {
            return (
              <CommunityTierListBox
                data={communityTierList}
                key={communityTierList.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TierListNefties;
