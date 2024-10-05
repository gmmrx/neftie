import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import SingleNeftie from "./view";
import { useTranslation } from "@/app/i18n";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { camelize } from "@/lib/utils";
import path from "path";
import fs from "fs";

export const fetchCache = "force-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug, gifs, videos } = await getServerSideProps(params.slug);

  return <SingleNeftie slug={params.slug} gifs={gifs} videos={videos} />;
}

const capitalizeWords = (str: string) => {
  return str
    .replace(/-/g, " ") // Replace hyphens with spaces
    .toLowerCase() // Convert all characters to lowercase first
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const formattedSlug = params.slug.replace(/-/g, " ");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(params.locale, "translation", {});
  return {
    title: t("translation:page_information:single_neftie.title", {
      neftie: capitalizeWords(params.slug),
      patch: CURRENT_PATCH_VERSION,
    }),
    description: t("translation:page_information:single_neftie.description", {
      neftie: capitalizeWords(params.slug),
      patch: CURRENT_PATCH_VERSION,
    }),
  };
}
async function getServerSideProps(slug: string) {
  const gifsDir = path.join(process.cwd(), "public/images", "neftie-gifs");
  const videosDir = path.join(process.cwd(), "public/skill-videos", slug);

  let gifs: string[] = [];
  let videos: string[] = [];

  // Handle GIFs (this part is working fine already)
  try {
    const gifFiles = fs.readdirSync(gifsDir);

    gifs = gifFiles
      .filter((file) => file.includes(slug) && file.endsWith(".gif"))
      .map((file) => `/images/neftie-gifs/${file}`);
  } catch (error) {
    console.error(`Error reading GIFs for ${slug}:`, error);
  }

  // Handle Videos (with specific structure in skill-videos/slug folder)
  try {
    // Check if the directory for the slug exists
    if (fs.existsSync(videosDir)) {
      // Check for video files from 0.mp4 to 4.mp4
      for (let i = 0; i <= 4; i++) {
        const videoFile = path.join(videosDir, `${i}.mp4`);
        if (fs.existsSync(videoFile)) {
          // Add the video file to the array if it exists
          videos.push(`/skill-videos/${slug}/${i}.mp4`);
        }
      }
    } else {
      console.warn(`No directory found for videos at ${videosDir}`);
    }
  } catch (error) {
    console.error(`Error reading Videos for ${slug}:`, error);
  }

  return {
    slug,
    gifs,
    videos,
  };
}
