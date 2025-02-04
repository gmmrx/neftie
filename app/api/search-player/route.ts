import { type NextRequest, NextResponse as Response } from "next/server";
import axios from "axios";

const statUrl = process.env.NEFTIE_STAT_API;
async function handleGet(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  try {
    const searchResponse = await axios.get(`${statUrl}/search/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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
