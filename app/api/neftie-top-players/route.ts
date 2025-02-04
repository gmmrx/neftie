import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import axios from "axios";

const statUrl = process.env.NEFTIE_STAT_API;
async function handleGet(req: NextRequest) {
  const neftie = req.nextUrl.searchParams.get("neftie");
  try {
    const topPlayersResponse = await axios.get(
      `${statUrl}/nefties/top-players/${neftie}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({
      status: 200,
      result: true,
      data: topPlayersResponse?.data,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
