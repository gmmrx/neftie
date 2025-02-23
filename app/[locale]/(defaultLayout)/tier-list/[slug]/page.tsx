import "server-only";
import { Metadata, ResolvingMetadata } from "next";
import axios from "axios";
import getApiUrl from "@/lib/get-api-url";
import { useTranslation } from "@/app/i18n";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import SingleTierList from "./view";

export const fetchCache = "force-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  const { tierListData, commentsData } = await getServerSideProps(params.slug);
  return <SingleTierList data={tierListData} initialComments={commentsData} />;
}

export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { t } = await useTranslation(params.locale, "translation", {});
  const { tierListData } = await getServerSideProps(params.slug);

  return {
    title: t("translation:page_information:single_tier_list.title", {
      title: tierListData.title,
    }),
    description: t("translation:page_information:tier_list.description", {
      description: tierListData.description,
    }),
  };
}

async function getServerSideProps(slug: string) {
  const apiUrl = getApiUrl();

  // First get the tier list
  const tierListResponse = await axios.get(`${apiUrl}/tier-list/${slug}`);
  const tierListData = tierListResponse.data.data;

  // Then get comments using the tier list's ID
  const commentsResponse = await axios.get(
    `${apiUrl}/tier-list/comment?tierListId=${tierListData.id}`
  );

  return {
    tierListData: tierListData,
    commentsData: commentsResponse.data.data,
  };
}
