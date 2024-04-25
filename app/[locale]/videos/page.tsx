import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import VideosPage from "./view";
import axios from "axios";
import getApiUrl from "@/lib/get-api-url";

export const fetchCache = "force-no-store";

export default async function Page({ params: { locale } }: any) {
  return <VideosPage />;
}
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Videos`,
    description: `List of Nefties of Seekers of Tokane game`,
  };
}

async function getServerSideProps(locale: string) {}
