import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import SingleNeftie from "./view";
import { NeftieList } from "@/lib/data/nefties";
import ListNefties from "./view";
import { useTranslation } from "../../../i18n";

export const fetchCache = "force-no-store";

export default async function Page() {
  return <ListNefties />;
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:eggs.title"),
    description: t("translation:page_information:eggs.description"),
  };
}

async function getServerSideProps(slug: string) {}
