import "server-only";
import { Metadata, ResolvingMetadata } from "next";

import SingleNeftie from "./view";
import { NeftieList } from "@/lib/data/nefties";
import ListNefties from "./view";

export const fetchCache = "force-no-store";

export default async function Page() {
  return <ListNefties />;
}
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Nefties List`,
    description: `List of Nefties of Seekers of Tokane game`,
  };
}

async function getServerSideProps(slug: string) {}
