import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import VideosPage from "./view";
import axios from "axios";
import getApiUrl from "@/lib/get-api-url";
import { useTranslation } from "@/app/i18n";

export const fetchCache = "force-no-store";

export default async function Page({ params: { locale } }: any) {
  return <VideosPage />;
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:events.title"),
    description: t("translation:page_information:events.description"),
  };
}

async function getServerSideProps(locale: string) {}
