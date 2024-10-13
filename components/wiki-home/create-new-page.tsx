"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { WikiEditor } from "../wiki-editor";

const CreateNewPage = () => {
  const { t } = useTranslation();
  const [pageTitle, setPageTitle] = useState<string>("Aurory");
  const [creationStep, setCreationStep] = useState<number>(1);

  return (
    <div className="w-full">
      <Card className="w-full rounded-sm">
        <CardHeader className="flex flex-row items-center gap-8">
          <CardTitle className="uppercase">
            {t("wiki:create_page.title")}
          </CardTitle>
        </CardHeader>
        {creationStep === 0 ? (
          <CardContent>
            <div className="text-sm camelcase font-normal mt-2 text-[#c7c7c7]">
              {t("wiki:create_page.check_title")}
            </div>
            <Input
              className="bg-[#202020] mt-3"
              onChange={(e) => setPageTitle(e.target.value)}
            />
            <div className="text-xs camelcase font-normal mt-2 text-[#868686]">
              {t("wiki:create_page.check_title_desc")}
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="mt-3 ml-auto"
                onClick={() => setCreationStep(1)}
              >
                {t("translation:submit")}
              </Button>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="text-md camelcase font-normal mt-2 text-[#c7c7c7]">
              {t("wiki:create_page.page_title")}: <strong>{pageTitle}</strong>
            </div>
            <WikiEditor editorState={undefined} updateEditorState={undefined} />
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CreateNewPage;
