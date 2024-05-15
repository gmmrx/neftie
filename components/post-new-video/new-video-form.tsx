"use client";

import { useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LANGUAGE } from "@/lib/data/constants";
import { Switch } from "../ui/switch";
import { useVideos } from "@/providers/VideosProvider";

const newVideoSchema = z.object({
  name: z.string().min(1, {
    message: "video_form.name_required",
  }),
  description: z.string().min(1, {
    message: "video_form.description_required",
  }),
  language: z
    .string({
      required_error: "video_form.language_required",
    })
    .min(1, {
      message: "video_form.language_required",
    }),
  safe_for_child: z.boolean(),
  category: z
    .string({
      required_error: "video_form.category_required",
    })
    .min(1, {
      message: "video_form.category_required",
    }),
});

function NewVideoForm({ data }) {
  const { t } = useTranslation();
  const { videoCategories } = useVideos();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof newVideoSchema>>({
    resolver: zodResolver(newVideoSchema),
    defaultValues: {
      name: data.snippet.title || "",
      description: data.snippet.description || "",
      safe_for_child: true,
    },
  });
  const onSubmit = async (formData: z.infer<typeof newVideoSchema>) => {
    try {
      setIsLoading(true);
      const submitVideoRequest = await axios.post("/api/videos", {
        ...formData,
        yt_url: data.id,
        thumbnail: data.snippet.thumbnails.high.url,
        status: "PENDING",
        user_id: session?.user.id,
        category: parseInt(formData.category, 10),
      });
      return toast({
        description: t("translation:video_form.posted_success"),
      });
    } catch (e) {
      return toast({
        description: t("translation:video_form.issue_posting"),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="my-6">
        <img src={data.snippet.thumbnails.high.url} className="w-full" />
      </div>
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
                      placeholder={t("translation:video_form.video_title")}
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
                    <Textarea
                      {...field}
                      className="h-[50px] text-base"
                      disabled={isLoading}
                      placeholder={t(
                        "translation:video_form.video_description"
                      )}
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
          <div className="my-6">
            <FormField
              control={form.control}
              name="category"
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
                            placeholder={t("translation:select_a_category")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="scroll-smooth">
                          {videoCategories.map((category) => {
                            const titleTranslationKey = t(
                              `translation:video_categories.${category.name}`
                            );
                            return (
                              <SelectItem
                                key={category.name}
                                value={category.id.toString()}
                              >
                                {titleTranslationKey}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-[0.7rem] text-right" />
                </FormItem>
              )}
            />
          </div>
          <div className="my-6">
            <FormField
              control={form.control}
              name="safe_for_child"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t("translation:safe_for_children")}
                    </FormLabel>
                    <FormDescription>
                      {t("translation:safe_for_children_desc")}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="flex items-center gap-4 mt-4 text-sm"
            disabled={isLoading}
          >
            {t("translation:upload_video")}
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default NewVideoForm;
