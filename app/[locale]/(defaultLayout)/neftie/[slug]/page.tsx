import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import SingleNeftie from "./view";
import { NeftieList } from "@/lib/data/nefties";

export const fetchCache = "force-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  return <SingleNeftie slug={params.slug} />;
}
export async function generateMetadata(
  { params }: { params: { slug: string; locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `${params.slug.toUpperCase()} Neftie Information`,
    description: `${params.slug.toUpperCase()} neftie abilities`,
  };
}

async function getServerSideProps(slug: string) {}
