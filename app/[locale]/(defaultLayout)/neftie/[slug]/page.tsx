import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import SingleNeftie from "./view";
import { useTranslation } from "@/app/i18n";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { camelize } from "@/lib/utils";
import path from "path";
import fs from "fs";
import axios from "axios";

export const fetchCache = "force-no-store";
const statApi = process.env.NEFTIE_STAT_API;

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug, videos, counterData, skins } = await getServerSideProps(
    params.slug
  );

  return (
    <SingleNeftie
      slug={params.slug}
      videos={videos}
      counterData={counterData}
      skins={skins}
    />
  );
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

  const counterData = await axios.get(
    `${statApi}/tierlist/neftie-matchups?neftie_name=${capitalizeWords(slug)}&patch_number=${CURRENT_PATCH_VERSION}`
  );
  const skinsData = await axios.get(
    `https://items-public-api.live.aurory.io/v1/items?items_with_price=true&best_listing_price_gte=0&attributes=Neftie%2CIN%2C${capitalizeWords(slug)}&attributes=Type%2CIN%2CSkin&page_size=12&page=0&order_by=best_listing_price%2CASC`
  );
  return {
    slug,
    videos,
    counterData: counterData?.data,
    skins: skinsData?.data?.data,
  };
}
