import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import axios from "axios";
import getApiUrl from "@/lib/get-api-url";
import { useTranslation } from "@/app/i18n";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import SingleTierList from "./view";

export const fetchCache = "force-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  const tierListData = await getServerSideProps(params.slug);
  return <SingleTierList data={tierListData} />;
}

export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  const tierListData = await getServerSideProps(params.slug);

  return {
    title: t("translation:page_information:single_tier_list.title", {
      username: tierListData.User.username,
      patch: CURRENT_PATCH_VERSION,
    }),
    description: t("translation:page_information:tier_list.description"),
  };
}

async function getServerSideProps(slug: string) {
  const apiUrl = getApiUrl();
  const tierListData = await axios.get(`${apiUrl}/tier-list/${slug}`);
  return tierListData.data.data;
}
