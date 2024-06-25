"use client";

import { useNefties } from "@/providers/NeftiesProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { DeleteIcon, EditIcon } from "lucide-react";
import React, { useState } from "react";
import AddNeftieModal from "./add-neftie";

const NeftiesTable = () => {
  const { nefties } = useNefties(); // Your provider/context hook
  const { t } = useTranslation();
  const [selectedNeftie, setSelectedNeftie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (neftie) => {
    setSelectedNeftie(neftie);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("translation:name")}</TableHead>
            <TableHead>{t("translation:element")}</TableHead>
            <TableHead>{t("translation:actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nefties.map((neftie) => (
            <TableRow key={neftie.id}>
              <TableCell className="flex items-center gap-2">
                <img
                  src={`/images/mini-nefties/${neftie.slug}.png`}
                  className="rounded-full w-8 h-8"
                />
                {neftie.name}
              </TableCell>
              <TableCell>{neftie.element.toUpperCase()}</TableCell>
              <TableCell className="flex items-center gap-2">
                <EditIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={() => handleEdit(neftie)}
                />
                <DeleteIcon size={20} className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && (
        <AddNeftieModal
          isOpen={isModalOpen}
          onToggle={setIsModalOpen}
          initialData={selectedNeftie}
        />
      )}
    </div>
  );
};

export default NeftiesTable;
