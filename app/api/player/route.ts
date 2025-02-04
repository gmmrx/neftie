import { type NextRequest, NextResponse as Response } from "next/server";
import axios from "axios";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";

const statUrl = process.env.NEFTIE_STAT_API;
async function handleGet(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  try {
    const searchResponse = await axios.get(
      `${statUrl}/players/get/${slug}?patch=${CURRENT_PATCH_VERSION}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({
      status: 200,
      result: true,
      data: searchResponse?.data,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
