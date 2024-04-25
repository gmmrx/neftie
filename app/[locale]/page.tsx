import NeftieListHome from "@/components/neftie-list-home";
import WhatIsNeftieBox from "@/components/what-is-neftie-box";
import { syncAndForceDB } from "@/lib/create-tables";

export default async function Home() {
  // await syncAndForceDB();
  return (
    <main className="flex min-h-screen flex-col items-start p-10 !pl-6 max-w-[70rem] font-ibmplex">
      <WhatIsNeftieBox />
      <div className="mt-4 flex gap-2 w-full flex-wrap md:justify-between">
        <NeftieListHome />
      </div>
    </main>
  );
}
