"use client";

import NeftiesTable from "@/components/admin-nefties/nefties-table";
import { NextPage } from "next";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const AdminNeftiesHome: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-left pt-10 text-xl font-semibold px-6 min-h-[100vh] max-w-[70rem] overflow-y-scroll pb-6">
      <div className="w-full flex justify-end mb-4">
        <Button variant="outline">{t("admin:add_new_neftie")}</Button>
      </div>
      <NeftiesTable />
    </div>
  );
};

export default AdminNeftiesHome;
