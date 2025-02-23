import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import { Sequelize } from "sequelize";

async function handlePost(req: NextRequest) {
  try {
    const { tierListId, userId, content, parentCommentId } = await req.json();

    if (!tierListId || !userId || !content) {
      return new Response("Missing required parameters.", { status: 400 });
    }

    // Create the comment
    const comment = await models.TierListComment.create({
      tierListId,
      userId,
      content,
      parentCommentId: parentCommentId || null,
    });

    // Fetch the created comment with user information
    const commentWithUser = await models.TierListComment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: models.User,
          as: "User",
          attributes: ["id", "username", "picture"],
        },
      ],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        result: true,
        data: commentWithUser,
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

async function handleGet(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tierListId = searchParams.get("tierListId");

    if (!tierListId) {
      return new Response("Missing tierListId parameter.", { status: 400 });
    }

    const comments = await models.TierListComment.findAll({
      where: {
        tierListId,
        parentCommentId: null, // Get only top-level comments
      },
      include: [
        {
          model: models.User,
          as: "User",
          attributes: ["id", "username", "picture"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return new Response(
      JSON.stringify({
        status: 200,
        result: true,
        data: comments,
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
export { handlePost as POST, handleGet as GET };
