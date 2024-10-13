import { useTranslation } from "@/app/i18n";
import LastNeftieSales from "@/components/last-sales";
import { RandomEgg } from "@/components/random-egg";
import WhatIsNeftieBox from "@/components/what-is-neftie-box";
import { syncAndForceDB } from "@/lib/create-tables";
import { Metadata, ResolvingMetadata } from "next";

export default async function Home() {
  // await syncAndForceDB();
  return (
    <main className="flex min-h-screen flex-col items-start p-10 !pl-6 max-w-[70rem] min-h-[84.5vh] mx-auto font-ibmplex">
      <WhatIsNeftieBox />
      <div className="flex justify-between w-full flex-col lg:flex-row">
        <LastNeftieSales />
        <RandomEgg />
      </div>
    </main>
  );
}
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:home.title"),
    description: t("translation:page_information:home.description"),
  };
}
