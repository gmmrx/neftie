import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import { useTranslation } from "@/app/i18n";
import ListBosses from "./view";

export const fetchCache = "force-no-store";

export default async function Page() {
  return <ListBosses />;
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:bosses.title"),
    description: t("translation:page_information:bosses.description"),
  };
}

async function getServerSideProps(slug: string) {}
