import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import TutorialsPage from "./view";
import { useTranslation } from "@/app/i18n";

export const fetchCache = "force-no-store";

export default async function Page({ params: { locale } }: any) {
  return <TutorialsPage />;
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:tutorials.title"),
    description: t("translation:page_information:tutorials.description"),
  };
}

async function getServerSideProps(locale: string) {}
