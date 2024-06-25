import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useTranslation } from "react-i18next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { z } from "zod";
import { ElementList } from "@/lib/data/elements";
import axios from "axios";

const skillSchema = z.object({
  icon: z.string().optional(),
  name: z.string().min(1, { message: "Skill name is required" }),
  description: z.string().min(1, { message: "Skill description is required" }),
  hype: z.string().optional(),
});

const neftieSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  element: z.string(),
  image: z.string(), // Ensure how you handle file uploads
  slug: z.string().min(1, { message: "Slug is required" }),
  skills: z.array(skillSchema),
});

const AddNeftieModal = ({ isOpen, onToggle, initialData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(neftieSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      image: "",
      element: "",
      slug: "",
      skills: [{ name: "", description: "", icon: "", hype: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  const onSubmit = async (data) => {
    setIsLoading(true);

    const url = "/api/nefties";
    const method = initialData.id ? "put" : "post";

    try {
      const response = await axios[method](url, {
        ...data,
        id: initialData.id,
      });

      if (response.data) {
        onToggle(false);
      } else {
        console.log("error adding neftie");
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => onToggle(open)}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("name")} className="mb-4" />
            )}
          />
          <FormField
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t("description")}
                className="mb-4"
              />
            )}
          />
          <FormField
            control={control}
            name="element"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="text-sm mb-4">
                  <SelectValue placeholder={t("translation:element")} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup className="scroll-smooth">
                    {ElementList.map((element) => {
                      const translationString = `translation:elements.${element.name}`;
                      return (
                        <SelectItem key={element.name} value={element.name}>
                          {t(translationString)}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            name="slug"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("slug")} className="mb-4" />
            )}
          />
          <FormField
            name="image"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("image")} className="mb-4" />
            )}
          />
          <h2>Skills</h2>
          {fields.map((field, index) => (
            <div key={field.id}>
              <Input
                className="mb-4"
                {...register(`skills.${index}.icon`)}
                placeholder="Skill icon"
              />
              <Input
                className="mb-4"
                {...register(`skills.${index}.name`)}
                placeholder="Skill name"
              />
              <Input
                className="mb-4"
                {...register(`skills.${index}.description`)}
                placeholder="Skill description"
              />
              <Input
                className="mb-4"
                {...register(`skills.${index}.hype`)}
                placeholder="Skill hype"
              />
              <Button onClick={() => remove(index)} className="mb-4">
                Remove Skill
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              append({ name: "", description: "", icon: "", hype: "" })
            }
            className="mb-4"
          >
            Add Skill
          </Button>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNeftieModal;
