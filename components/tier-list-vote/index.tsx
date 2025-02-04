"use client";

import { useNefties } from "@/providers/NeftiesProvider";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import axios from "axios";

const tiers = [
  { id: "S", name: "S", color: "#28a745" },
  { id: "A", name: "A", color: "#8bc34a" },
  { id: "B", name: "B", color: "rgb(208 186 0)" },
  { id: "C", name: "C", color: "#ff9800" },
  { id: "D", name: "D", color: "#f44336" },
];

export interface Item {
  id: number;
  name: string;
}

export interface DragItem {
  id: number;
  name: string;
}

const TierListVote: NextPage = () => {
  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableItems, setAvailableItems] = useState<any[]>(nefties);
  const [tierItems, setTierItems] = useState<{ [key: string]: any[] }>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
  });
  const [tierListSlug, setTierListSlug] = useState<string>("");
  useEffect(() => {
    setAvailableItems(nefties);
  }, [nefties]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getItems(source.droppableId),
        source.index,
        destination.index
      );

      updateItems(source.droppableId, items);
    } else {
      const result = move(
        getItems(source.droppableId),
        getItems(destination.droppableId),
        source,
        destination
      );

      updateItems(source.droppableId, result[source.droppableId]);
      updateItems(destination.droppableId, result[destination.droppableId]);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getItems = (id) => {
    if (id === "availableItems") {
      return availableItems;
    }
    return tierItems[id] || [];
  };

  const updateItems = (id, items) => {
    if (id === "availableItems") {
      setAvailableItems(items);
    } else {
      setTierItems((prev) => ({
        ...prev,
        [id]: items,
      }));
    }
  };
  const onPostClick = async () => {
    setIsLoading(true);

    if (availableItems.length > 0) {
      setIsLoading(false);
      return toast({
        description: t("translation:select_tier_for_each_neftie"),
      });
    }
    const formData = {
      userId: session?.user.id,
      sTier: (tierItems.S || []).map((neftie) => neftie.id),
      aTier: (tierItems.A || []).map((neftie) => neftie.id),
      bTier: (tierItems.B || []).map((neftie) => neftie.id),
      cTier: (tierItems.C || []).map((neftie) => neftie.id),
      dTier: (tierItems.D || []).map((neftie) => neftie.id),
      patchVersion: CURRENT_PATCH_VERSION,
    };

    try {
      const voteResponse = await axios.post("/api/tier-list", formData);

      if (voteResponse.data.data) {
        setTierListSlug(voteResponse.data.data.slug);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="pt-4 text-xl font-semibold max-w-[70rem] w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-0 text-left mr-0">
              <StarHalf /> {t("translation:post_your_tier_list")}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[100%] max-h-[100%] top-0 bottom-0 h-full left-0 right-0 translate-x-0 translate-y-0">
            <div className="p-4">
              <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-4">
                  {tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center h-[100px] border w-full"
                    >
                      <div
                        className={`font-bold mr-2 w-[100px] px-4  leading-[100px] text-center rounded`}
                        style={{
                          backgroundColor: tier.color,
                        }}
                      >
                        {tier.name}
                      </div>
                      <Droppable
                        key={tier.id}
                        droppableId={tier.id}
                        direction="horizontal"
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex space-x-2 p-2 w-[calc(100%-100px)] h-full bg-[#242424] overflow-scroll no-scrollbar"
                          >
                            {(tierItems[tier.id] || []).map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="rounded-[100%] cursor-pointer touch-none"
                                  >
                                    <div className="flex flex-col relative">
                                      <div
                                        style={{
                                          backgroundImage: `url(${item.image})`,
                                        }}
                                        className={`rounded-full w-[80px] h-[80px] object-cover mx-auto bg-center bg-[length:170%_180%]`}
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-[2px] w-full border" />
                <div className="mt-4 border">
                  <Droppable
                    droppableId="availableItems"
                    direction="horizontal"
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-4 border rounded flex flex-wrap gap-2"
                      >
                        {availableItems.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="rounded-[100%] cursor-pointer touch-none	"
                              >
                                <div className="flex flex-col relative">
                                  <div
                                    style={{
                                      backgroundImage: `url(${item.image})`,
                                    }}
                                    className={`rounded-full w-[80px] h-[80px] object-cover mx-auto bg-center bg-[length:170%_180%] rounded-[100%]`}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
              {tierListSlug ? (
                <div className="flex justify-center items-center border min-w-[150px] p-4 my-6">
                  Your Tier List Url:{" "}
                  {`https://neftie.gg/tier-list/${tierListSlug}`}
                </div>
              ) : (
                ""
              )}

              <div className="mt-4 justify-center flex gap-4 items-center w-full">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isLoading}
                  >
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
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DragDropContext>
  );
};

export default TierListVote;
