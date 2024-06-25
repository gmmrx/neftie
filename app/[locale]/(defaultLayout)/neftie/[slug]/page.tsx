import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import SingleNeftie from "./view";
import { useTranslation } from "@/app/i18n";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { camelize } from "@/lib/utils";

export const fetchCache = "force-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  return <SingleNeftie slug={params.slug} />;
}
export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:single_neftie.title", {
      neftie: camelize(params.slug),
      patch: CURRENT_PATCH_VERSION,
    }),
    description: t("translation:page_information:single_neftie.description", {
      neftie: camelize(params.slug),
      patch: CURRENT_PATCH_VERSION,
    }),
  };
}

async function getServerSideProps(slug: string) {}
