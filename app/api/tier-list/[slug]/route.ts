import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const tierListSlug = params.slug;

  try {
    const isUserVotedForThisPatch = await models.UserTierList.findOne({
      where: { slug: tierListSlug },
      include: models.User,
    });
    if (!isUserVotedForThisPatch) {
      return Response.json({
        status: 404,
        success: false,
        message: "Tier List not found",
      });
    }

    return Response.json({
      status: 200,
      success: true,
      data: isUserVotedForThisPatch,
    });
  } catch (e) {
    console.log(e);
  }
}

export { handleGet as GET };
