"use client";

import NeftiesTable from "@/components/admin-nefties/nefties-table";
import { NextPage } from "next";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AddNeftieModal from "./add-neftie";

const AdminNeftiesHome: NextPage = () => {
  const { t } = useTranslation();
  const [isNewNeftieModalOpened, setIsNewNeftieModalOpened] =
    useState<boolean>(false);

  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem] overflow-y-scroll pb-6 no-scrollbar mx-auto">
      <div className="w-full flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => setIsNewNeftieModalOpened(true)}
        >
          {t("admin:add_new_neftie")}
        </Button>
      </div>
      <NeftiesTable />
      <AddNeftieModal
        isOpen={isNewNeftieModalOpened}
        onToggle={setIsNewNeftieModalOpened}
        initialData={undefined}
      />
    </div>
  );
};

export default AdminNeftiesHome;
