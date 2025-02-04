import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import axios from "axios";
import getApiUrl from "@/lib/get-api-url";
import { useTranslation } from "@/app/i18n";
import SinglaPlayerView from "./view";

export const fetchCache = "force-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  const playerData = await getServerSideProps(params.slug);
  return <SinglaPlayerView data={playerData} />;
}

export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  const playerData = await getServerSideProps(params.slug);

  return {
    title: t("translation:page_information:player_profile.title", {
      username: playerData.username,
    }),
    description: t("translation:page_information:player_profile.description", {
      username: playerData.username,
    }),
  };
}

async function getServerSideProps(slug: string) {
  const apiUrl = getApiUrl();
  const profileData = await axios.get(`${apiUrl}/player?slug=${slug}`);
  return profileData.data.data;
}
