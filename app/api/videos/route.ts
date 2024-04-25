import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  const language = req.nextUrl.searchParams.get("locale");
  const catId = req.nextUrl.searchParams.get("catId");
  try {
    const categoryFilter = catId ? parseInt(catId, 10) : null;
    const videos = await models.Video.findAll({
      where: {
        locale: language || "en", // Default to English if no locale is provided
        status: "APPROVED",
      },
      include: [
        {
          model: models.VideoCategory,
          required: !!categoryFilter, // Only join if a category ID is provided
          where: categoryFilter ? { id: categoryFilter } : {}, // Apply category filter
          through: {
            attributes: [], // Exclude attributes from the junction table if not needed
          },
        },
      ],
    });

    return Response.json({
      status: 200,
      result: true,
      data: videos,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

async function handlePost(req: NextRequest) {
  const data = await req.json();

  try {
    const videos = await models.Video.create({
      ...data,
      is_for_children: data.safe_for_child,
      locale: data.language,
    });
    if (videos) {
      const addVideoCategory = await models.VideoCategoryList.create({
        category_id: data.category,
        video_id: videos.getDataValue("id"),
      });
    }
    return Response.json({
      status: 200,
      result: true,
      data: videos,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET, handlePost as POST };
