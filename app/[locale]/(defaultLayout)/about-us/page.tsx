import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import ListNefties from "./view";
import { useTranslation } from "@/app/i18n";

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
    title: "Neftie GG - About Us",
    description: "Neftie GG about the project",
  };
}

async function getServerSideProps(slug: string) {}
