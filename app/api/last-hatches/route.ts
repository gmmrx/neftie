import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import axios from "axios";

const statUrl = process.env.NEFTIE_STAT_API;
async function handleGet(req: NextRequest) {
  try {
    const hatchResponse = await axios.get(
      `${statUrl}/incubations/latest-incs`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({
      status: 200,
      result: true,
      data: hatchResponse?.data,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
