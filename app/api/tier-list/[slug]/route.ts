import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    if (!slug) {
      return new Response("Missing slug parameter.", { status: 400 });
    }

    // Fetch the UserTierList with related Tiers and TierItems
    const userTierList = await models.UserTierList.findOne({
      where: { slug },
      include: [
        {
          model: models.User,
          as: "User", // Assuming the alias for the user association is 'user'
          attributes: ["id", "username"], // Include necessary user fields
        },
        {
          model: models.Tier,
          as: "tiers",
          include: [
            {
              model: models.TierItem,
              as: "items",
            },
          ],
        },
      ],
    });

    if (!userTierList) {
      return new Response("Tier list not found.", { status: 404 });
    }

    return new Response(
      JSON.stringify({
        status: 200,
        result: true,
        data: userTierList,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("something_went_wrong", {
      status: 500,
    });
  }
}
export { handleGet as GET };
