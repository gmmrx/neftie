"use client";

import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CalendarIcon, Loader2, TrashIcon } from "lucide-react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Editor } from "../editor";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LANGUAGE } from "@/lib/data/constants";
import axios from "axios";

const newEventSchema = z.object({
  name: z.string().min(1, {
    message: "event_form.name_required",
  }),
  description: z.string(),
  starts_at: z.date(),
  ends_at: z.date(),
  discord_url: z.string().min(1, {
    message: "event_form.name_required",
  }),
  prizes: z
    .array(
      z.object({
        order: z.number().min(1, { message: "event_form.order_required" }),
        prize: z.string().min(1, { message: "event_form.prize_required" }),
        currency: z.enum(["USD", "AURY"]),
      })
    )
    .nonempty({ message: "event_form.at_least_one_prize" }),
  rules: z
    .array(z.string().min(1, { message: "event_form.rule_required" }))
    .nonempty({ message: "event_form.at_least_one_rule" }),
  language: z.string(),
});

const PostNewEvent = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newEventSchema>>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      name: "",
      description: "",
      discord_url: "https://discord.gg/aurory-project-836601552130801676",
      prizes: [{ order: 1, prize: "0", currency: "AURY" }],
      rules: ["Rule 1"],
    },
  });
  const {
    fields: prizeFields,
    append: appendPrize,
    remove: removePrize,
  } = useFieldArray({
    control: form.control,
    name: "prizes",
  });

  const {
    fields: ruleFields,
    append: appendRule,
    remove: removeRule,
  } = useFieldArray({
    control: form.control,
    name: "rules",
  });

  const onSubmit = async (formData: z.infer<typeof newEventSchema>) => {
    try {
      setIsLoading(true);
      const createNewEvent = await axios.post(`/api/events`, formData);
    } catch {
    } finally {
      setIsLoading(false);
    }
    console.log(formData);
  };

  return (
    <div className="pt-4 text-xl font-semibold px-4 max-w-[70rem]">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !isLoading && setIsOpen(open)}
      >
        <DialogContent className="sm:max-w-md md:min-w-[50%]">
          <DialogHeader>
            <DialogTitle>{t("translation:event_form.title")}</DialogTitle>
            <DialogDescription>
              <div className="mt-4 mb-1">
                {t("translation:event_form.event_details_desc")}
              </div>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-[50px] text-base"
                          maxLength={500}
                          disabled={isLoading}
                          placeholder={t("translation:event_form.event_name")}
                        />
                      </FormControl>
                      <FormMessage className="text-[0.7rem] text-right" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="description"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor
                          editorState={field.value}
                          updateEditorState={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="text-[0.7rem] text-right" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="starts_at"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={
                                "w-full justify-start text-left font-normal"
                              }
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>
                                  {t("translation:event_form.pick_start_date")}
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage className="text-[0.7rem] text-right" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="ends_at"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={
                                "w-full justify-start text-left font-normal"
                              }
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>
                                  {t("translation:event_form.pick_end_date")}
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage className="text-[0.7rem] text-right" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="discord_url"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-[50px] text-base"
                          maxLength={500}
                          disabled={isLoading}
                          placeholder={t("translation:event_form.discord_url")}
                        />
                      </FormControl>
                      <FormMessage className="text-[0.7rem] text-right" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {t("translation:event_form.prizes")}
                  </h3>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      appendPrize({
                        order: prizeFields.length + 1,
                        prize: "0",
                        currency: "AURY",
                      })
                    }
                    disabled={isLoading}
                  >
                    {t("translation:event_form.add_prize")}
                  </Button>
                </div>
                <div className="text-sm mb-3">
                  {" "}
                  {t("translation:prize_explanation")}
                </div>
                {prizeFields.map((field, index) => (
                  <div key={field.id} className="mb-4 border p-2 rounded">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium">
                        {t("translation:prize")} {index + 1}{" "}
                      </h4>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removePrize(index)}
                        disabled={isLoading}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="my-2">
                      <FormField
                        control={form.control}
                        name={`prizes.${index}.order`}
                        disabled={isLoading}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-[50px] text-base"
                                disabled={isLoading}
                                placeholder={t("translation:prize_order")}
                              />
                            </FormControl>
                            <FormMessage className="text-[0.7rem] text-right" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="my-2">
                      <FormField
                        control={form.control}
                        name={`prizes.${index}.prize`}
                        disabled={isLoading}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                className="h-[50px] text-base"
                                disabled={isLoading}
                                placeholder={t("translation:prize_value")}
                              />
                            </FormControl>
                            <FormMessage className="text-[0.7rem] text-right" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="my-2">
                      <FormField
                        control={form.control}
                        name={`prizes.${index}.currency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={t(
                                      "translation:select_currency"
                                    )}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">$USD</SelectItem>
                                  <SelectItem value="AURY">$AURY</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-[0.7rem] text-right" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {t("translation:event_form.rules")}
                  </h3>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => appendRule("Rule 1")}
                    disabled={isLoading}
                  >
                    {t("translation:event_form.add_rule")}
                  </Button>
                </div>
                {ruleFields.map((field, index) => (
                  <div key={field.id} className="mb-4 border p-2 rounded">
                    <div className="flex justify-between items-center">
                      <h4 className="text-md font-medium">
                        {t("translation:event_form.rule")} {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeRule(index)}
                        disabled={isLoading}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="my-2">
                      <FormField
                        control={form.control}
                        name={`rules.${index}`}
                        disabled={isLoading}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-[50px] text-base"
                                disabled={isLoading}
                                placeholder={t("translation:event_form.rule")}
                              />
                            </FormControl>
                            <FormMessage className="text-[0.7rem] text-right" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="language"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-base">
                              <SelectValue
                                placeholder={t("translation:select_a_language")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup className="scroll-smooth">
                              {LANGUAGE.map((item) => (
                                <SelectItem key={item.code} value={item.code}>
                                  {item.code}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[0.7rem] text-right" />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="sm:justify-start !justify-between">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    {t("translation:close")}
                  </Button>
                </DialogClose>
                <Button type="submit" variant="default" disabled={isLoading}>
                  {t("translation:submit")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewEvent;
