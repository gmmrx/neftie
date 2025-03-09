import { useTranslation } from "@/app/i18n";
import HomeDownloadBox from "@/components/home-download-box";
import HomeSearch from "@/components/home-search";
import LastNeftieSales from "@/components/last-sales";
import LatestBattles from "@/components/latest-battles";
import LatestHatches from "@/components/latest-hatches";
import { RandomEgg } from "@/components/random-egg";
import { syncAndForceDB } from "@/lib/create-tables";

import { Metadata, ResolvingMetadata } from "next";

export default async function Home() {
  // await syncAndForceDB();
  return (
    <main className="flex min-h-[84.5vh] flex-col-reverse lg:flex-row  gap-[4rem] items-start p-2 lg:p-10 lg:!pl-6 max-w-[77rem] min-h-[84.5vh] mx-auto font-ibmplex">
      <div className="flex flex-col w-[95%] mx-auto lg:w-[46.125rem]">
        <HomeDownloadBox />
        <div className="flex justify-between w-full flex-col lg:flex-row">
          <LastNeftieSales />
        </div>
      </div>
      <div className="w-[1px] my-auto h-[550px] bg-white bg-gradient-to-b from-[#000000] via-[#999999] to-[#000000] hidden lg:block" />
      <div className="flex flex-col flex-none w-[95%] mx-auto lg:w-[380px]">
        <HomeSearch />
        <RandomEgg />
        <LatestHatches />
        <LatestBattles />
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
