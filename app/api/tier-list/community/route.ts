import { type NextRequest, NextResponse as Response } from "next/server";
import { models, sequelize } from "@/lib/db";
import { Op } from "sequelize";

async function handleGet(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sort") || "popular";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let order;
    if (sortBy === "popular") {
      order = [
        ["voteCount", "DESC"],
        ["viewCount", "DESC"],
        ["createdAt", "DESC"],
      ];
    } else {
      order = [["createdAt", "DESC"]];
    }

    const tierLists = await models.UserTierList.findAndCountAll({
      include: [
        {
          model: models.User,
          as: "User",
          attributes: ["id", "username", "picture"],
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
        {
          model: models.TierListComment,
          as: "comments",
          attributes: [], // We don't need the actual comments, just the count
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM tier_list_comments
              WHERE tier_list_comments."tierListId" = "UserTierList"."id"
            )`),
            "commentCount",
          ],
        ],
      },
      order,
      limit,
      offset,
    });
    // Separate count query to get accurate total
    const totalCount = await models.UserTierList.count();

    return new Response(
      JSON.stringify({
        status: 200,
        result: true,
        data: {
          items: tierLists.rows,
          pagination: {
            total: totalCount,
            page,
            totalPages: Math.ceil(totalCount / limit),
            hasMore: page * limit < totalCount,
          },
        },
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
