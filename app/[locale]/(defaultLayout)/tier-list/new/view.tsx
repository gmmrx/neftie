"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { useNefties } from "@/providers/NeftiesProvider";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";

const DraggableItem = ({ item, index, containerId }) => (
  <Draggable draggableId={`${containerId}-${item.id}`} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps.style,
          position: snapshot.isDragging
            ? "fixed"
            : snapshot.isDropAnimating
              ? "relative"
              : "relative",
          zIndex: snapshot.isDragging ? 1000 : "auto",
        }}
        className="rounded-full cursor-grab active:cursor-grabbing"
      >
        <div
          style={{
            backgroundImage: `url('/images/nefties/${item.slug}.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: snapshot.isDragging ? 0.9 : 1,
            width: "80px",
            height: "80px",
            borderRadius: "50%",
          }}
          className="mx-auto shadow-md"
        />
      </div>
    )}
  </Draggable>
);

const NewTierList: NextPage = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const { nefties } = useNefties();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tiers, setTiers] = useState([
    { id: "S", name: "S", color: "#28a745", items: [] },
    { id: "A", name: "A", color: "#8bc34a", items: [] },
    { id: "B", name: "B", color: "#d0ba00", items: [] },
    { id: "C", name: "C", color: "#ff9800", items: [] },
    { id: "D", name: "D", color: "#f44336", items: [] },
  ]);
  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    if (nefties?.length) {
      setAvailableItems(nefties);
    }
  }, [nefties]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTier = source.droppableId;
    const destTier = destination.droppableId;

    if (sourceTier === destTier) {
      const tier = tiers.find((t) => t.id === sourceTier);
      const items = Array.from(tier.items);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setTiers((prev) =>
        prev.map((t) => (t.id === tier.id ? { ...t, items } : t))
      );
    } else {
      const sourceItems = [...getItems(sourceTier)];
      const destItems = [...getItems(destTier)];
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      updateItems(sourceTier, sourceItems);
      updateItems(destTier, destItems);
    }
  };

  const getItems = (id) => {
    if (id === "availableItems") return availableItems;
    return tiers.find((t) => t.id === id)?.items || [];
  };

  const updateItems = (id, items) => {
    if (id === "availableItems") {
      setAvailableItems(items);
    } else {
      setTiers((prev) => prev.map((t) => (t.id === id ? { ...t, items } : t)));
    }
  };

  const handleAddTier = () => {
    const newId = `Tier-${Date.now()}`;
    setTiers([
      ...tiers,
      { id: newId, name: "New Tier", color: "#cccccc", items: [] },
    ]);
  };

  const handleRemoveTier = (id) => {
    setTiers(tiers.filter((tier) => tier.id !== id));
  };

  const handlePost = async () => {
    if (isLoading) return;
    if (!title.trim() || !description.trim()) {
      return toast({ description: "Title and Description are required." });
    }

    const formData = {
      userId: session?.user.id,
      title,
      description,
      tiers: tiers.map((tier) => ({
        name: tier.name,
        color: tier.color,
        items: tier.items.map((item) => item.id),
      })),
      patchVersion: CURRENT_PATCH_VERSION,
    };

    try {
      setIsLoading(true);
      const result = await axios.post("/api/tier-list", formData);
      toast({ description: "Tier list posted successfully!" });
      router.push(`/tier-list/${result.data.data.slug}`);
    } catch (error) {
      setIsLoading(false);
      toast({ description: "An error occurred." });
    } finally {
      setIsLoading(false);
    }
  };
  if (!session) return "Login";
  return (
    <div className="p-4">
      <div className="rounded-sm w-full text-left">
        <div className="flex justify-between items-center">
          <h2 className="scroll-m-20 pb-2 text-[36px] font-normal font-inter first:mt-0">
            Create New Tier List
          </h2>
          <div className="text-sm max-w-fit p-2 rounded-sm bg-white/10 text-xs font-normal uppercase">
            {t("translation:current_patch")}:
            <span className="font-semibold ml-1">{CURRENT_PATCH_VERSION}</span>
          </div>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 !bg-white/5 text-[24px] p-4 h-auto"
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4  !bg-white/5 text-[18px] p-4 h-auto"
      />

      <Button
        onClick={handleAddTier}
        className="ml-auto flex items-end bg-white/15 text-white"
      >
        Add New Tier
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        {tiers.map((tier) => (
          <div>
            <div className="w-full flex my-4 items-center gap-4">
              <Input
                type="color"
                value={tier.color}
                onChange={(e) =>
                  setTiers((prev) =>
                    prev.map((t) =>
                      t.id === tier.id ? { ...t, color: e.target.value } : t
                    )
                  )
                }
                className="mr-2 max-w-[50px]"
              />
              <Input
                type="text"
                value={tier.name}
                onChange={(e) =>
                  setTiers((prev) =>
                    prev.map((t) =>
                      t.id === tier.id ? { ...t, name: e.target.value } : t
                    )
                  )
                }
                style={{ backgroundColor: tier.color }}
                className="border mr-2 p-1 w-[150px]"
              />

              <Button
                onClick={() => handleRemoveTier(tier.id)}
                className="text-[10px] p-1 max-h-[30px] w-[30px] bg-transparent text-white hover:bg-transparent rounded-full"
              >
                <Trash className="max-w-[0.875rem]" />
              </Button>
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
                  className="flex items-center p-2 border my-4 min-h-[70px]"
                >
                  <div className="flex gap-2 ml-4">
                    {tier.items.map((item, index) => (
                      <DraggableItem
                        key={`${tier.id}-${item.id}`}
                        item={item}
                        index={index}
                        containerId={tier.id}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        ))}

        <Droppable droppableId="availableItems" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-4 border rounded flex flex-wrap gap-2 mt-4"
            >
              {availableItems.map((item, index) => (
                <DraggableItem
                  key={`available-${item.id}`}
                  item={item}
                  index={index}
                  containerId="availableItems"
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button onClick={handlePost} className="mt-4">
        {isLoading ? "Submitting.." : "Submit Tier List"}
      </Button>
    </div>
  );
};

export default NewTierList;
