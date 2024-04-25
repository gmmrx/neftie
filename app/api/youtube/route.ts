import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  const youtube = req.nextUrl.searchParams.get("youtube");
  try {
    const fetchYoutube = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${youtube}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`
    );
    const youtubeJson = await fetchYoutube.json();
    if (!youtubeJson) {
      return new Response("Video couldn't be found", {
        status: 404,
      });
    }
    return Response.json({
      status: 200,
      result: true,
      data: youtubeJson,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
