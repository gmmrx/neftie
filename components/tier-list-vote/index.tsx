"use client";

import { useNefties } from "@/providers/NeftiesProvider";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { StarHalf } from "lucide-react";
import NeftieSelectorInput from "../neftie-selector-input";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import axios from "axios";

const TierListVote: NextPage = () => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to track selected Nefties for each tier
  const [selectedSTier, setSelectedSTier] = useState([]);
  const [selectedATier, setSelectedATier] = useState([]);
  const [selectedBTier, setSelectedBTier] = useState([]);

  // Compute available Nefties for each tier by excluding selected Nefties from the other tiers
  const availableForSTier = useMemo(
    () =>
      nefties.filter(
        (n) => !selectedATier.includes(n) && !selectedBTier.includes(n)
      ),
    [nefties, selectedATier, selectedBTier]
  );
  const availableForATier = useMemo(
    () =>
      nefties.filter(
        (n) => !selectedSTier.includes(n) && !selectedBTier.includes(n)
      ),
    [nefties, selectedSTier, selectedBTier]
  );
  const availableForBTier = useMemo(
    () =>
      nefties.filter(
        (n) => !selectedSTier.includes(n) && !selectedATier.includes(n)
      ),
    [nefties, selectedSTier, selectedATier]
  );
  const onPostClick = async () => {
    setIsLoading(true);
    if (
      selectedSTier.length === 0 ||
      selectedATier.length === 0 ||
      selectedBTier.length === 0
    ) {
      setIsLoading(false);
      return toast({
        description: t("translation:select_neftie_for_each_tier"),
      });
    }
    const selectedNeftiesLength =
      selectedSTier.length + selectedATier.length + selectedBTier.length;

    if (nefties.length !== selectedNeftiesLength) {
      setIsLoading(false);
      return toast({
        description: t("translation:select_tier_for_each_neftie"),
      });
    }

    const formData = {
      userId: session?.user.id,
      sTier: selectedSTier.map((neftie) => neftie.id), // Assuming neftie object has an id
      aTier: selectedATier.map((neftie) => neftie.id),
      bTier: selectedBTier.map((neftie) => neftie.id),
      patchVersion: CURRENT_PATCH_VERSION,
    };

    try {
      const voteResponse = await axios.post("/api/tier-list", formData);
      if (voteResponse.data.data) {
        return toast({
          description: t(`translation:success.thanks_for_voting`),
        });
      } else {
        return toast({
          description: t(`translation:success.something_went_wrong`),
        });
      }
    } catch (e) {
      return toast({
        description: t(`translation:errors.${e.response.data}`) || "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="pt-4 text-xl font-semibold px-4 max-w-[70rem]">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-0 text-left mr-0">
            <StarHalf /> {t("translation:post_your_tier_list")}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("translation:tier_list_voting")}</DialogTitle>
            <DialogDescription>
              <div className="mt-4 mb-1">
                {t("translation:type_and_choose")}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2 mt-4">
              <div>
                {t("translation:select_x_tier_neftie", {
                  x: "S",
                })}
              </div>
              <NeftieSelectorInput
                availableTags={availableForSTier}
                value={selectedSTier}
                onChange={(newSelection) => setSelectedSTier(newSelection)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2 mt-4">
              <div>
                {t("translation:select_x_tier_neftie", {
                  x: "A",
                })}
              </div>
              <NeftieSelectorInput
                availableTags={availableForATier}
                value={selectedATier}
                onChange={(newSelection) => setSelectedATier(newSelection)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2 mt-4">
              <div>
                {t("translation:select_x_tier_neftie", {
                  x: "B",
                })}
              </div>
              <NeftieSelectorInput
                availableTags={availableForBTier}
                value={selectedBTier}
                onChange={(newSelection) => setSelectedBTier(newSelection)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start !justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isLoading}>
                {t("translation:close")}
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="default"
              onClick={onPostClick}
              disabled={isLoading}
            >
              {t("translation:post")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TierListVote;
