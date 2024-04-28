import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import TierListNefties from "./view";
import axios from "axios";
import getApiUrl from "@/lib/get-api-url";

export const fetchCache = "force-no-store";

export default async function Page() {
  const tierListData = await getServerSideProps();
  return <TierListNefties data={tierListData} />;
}
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Tier List`,
    description: `Tier List of Nefties`,
  };
}

async function getServerSideProps() {
  const apiUrl = getApiUrl();
  const tierListData = await axios.get(`${apiUrl}/tier-list`);
  return tierListData.data.data;
}
