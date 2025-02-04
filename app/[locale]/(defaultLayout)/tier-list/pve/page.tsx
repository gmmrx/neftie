import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import TierListNefties from "./view";
import axios from "axios";
import getApiUrl from "@/lib/get-api-url";
import { useTranslation } from "@/app/i18n";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";

export const fetchCache = "force-no-store";
const statApi = process.env.NEFTIE_STAT_API;

export default async function Page() {
  const tierListData = await getServerSideProps();

  return <TierListNefties data={tierListData} />;
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:tier_list.title"),
    description: t("translation:page_information:tier_list.description"),
  };
}

async function getServerSideProps() {
  const apiUrl = getApiUrl();
  const tierListData = await axios.get(
    `${statApi}/tierlist/type?patch_number=${CURRENT_PATCH_VERSION}&match_type=PvE`
  );
  return tierListData.data.tierList;
}
