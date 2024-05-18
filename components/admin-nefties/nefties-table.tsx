"use client";

import { useNefties } from "@/providers/NeftiesProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { DeleteIcon, EditIcon } from "lucide-react";

const NeftiesTable = () => {
  const { nefties } = useNefties();
  const { t } = useTranslation();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">{t("translation:name")}</TableHead>
            <TableHead>{t("translation:element")}</TableHead>
            <TableHead>{t("translation:actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nefties.map((neftie) => (
            <TableRow key={neftie.name}>
              <TableCell className="font-medium flex gap-2 items-center">
                <img
                  src={`/images/mini-nefties/${neftie.slug}.png`}
                  className="rounded-[100%] w-[30px] h-[30px]"
                />
                {neftie.name}
              </TableCell>
              <TableCell>
                {" "}
                {t(`translation:elements.${neftie.element}`).toUpperCase()}
              </TableCell>
              <TableCell className="flex gap-4">
                <EditIcon size={20} className="cursor-pointer" />
                <DeleteIcon size={20} className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NeftiesTable;
