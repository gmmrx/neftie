import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import EventPage from "./view";
import axios from "axios";
import getApiUrl from "@/lib/get-api-url";
import { useTranslation } from "@/app/i18n";

export const fetchCache = "force-no-store";

export default async function Page({ params: { slug, locale } }: any) {
  const eventData = await getServerSideProps(slug);
  return <EventPage eventData={eventData.data} />;
}
export async function generateMetadata(
  { params }: { params: { locale: string; slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const eventData = await getServerSideProps(params.slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:single_event.title", {
      event: eventData.data.name,
    }),
    description: t("translation:page_information:single_event.description", {
      event: eventData.data.name,
    }),
  };
}

async function getServerSideProps(slug: string) {
  const apiUrl = getApiUrl();
  const response = await axios.get(`${apiUrl}/event?slug=${slug}`, {});

  return { data: response.data.data || [] };
}
