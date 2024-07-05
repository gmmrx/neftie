import { useTranslation } from "@/app/i18n";
import WikiHome from "@/components/wiki-home";
import { Metadata, ResolvingMetadata } from "next";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start p-10 !pl-6 max-w-[70rem] font-ibmplex">
      <WikiHome />
    </main>
  );
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "wiki", {});
  return {
    title: t("wiki:page_title"),
    description: t("wiki:description"),
  };
}
