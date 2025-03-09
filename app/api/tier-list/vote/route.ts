import { type NextRequest, NextResponse as Response } from "next/server";
import { models, sequelize } from "@/lib/db";

async function handlePost(req: NextRequest) {
  try {
    const { userId, tierListId, vote } = await req.json();

    if (!userId || !tierListId) {
      return Response.json(
        { message: "Missing required parameters." },
        { status: 400 }
      );
    }

    const tierList = await models.UserTierList.findByPk(tierListId);

    if (!tierList) {
      return Response.json(
        { message: "Tier list not found." },
        { status: 404 }
      );
    }

    const transaction = await sequelize.transaction();

    try {
      const existingVote = await models.TierListVote.findOne({
        where: {
          tierListId,
          userId,
        },
        transaction, // Add transaction to the query to prevent race conditions
      });

      if (existingVote) {
        // If vote hasn't changed, do nothing
        if (existingVote.vote === vote) {
          await transaction.rollback();
          return Response.json({
            status: 200,
            result: true,
            message: "Vote unchanged",
            data: { voteCount: tierList.voteCount },
          });
        }

        // Update the vote record
        await existingVote.update({ vote }, { transaction });

        // Calculate correct vote count change
        // If flipping from upvote to downvote: -2
        // If flipping from downvote to upvote: +2
        const changeAmount = existingVote.vote !== vote ? (vote ? 2 : -2) : 0;

        await tierList.increment("voteCount", {
          by: changeAmount,
          transaction,
        });
      } else {
        // Create new vote with transaction
        await models.TierListVote.create(
          {
            tierListId,
            userId,
            vote,
          },
          { transaction }
        );

        // For new votes, add or subtract 1
        await tierList.increment("voteCount", {
          by: vote ? 1 : -1,
          transaction,
        });
      }

      // Ensure voteCount never goes below 0
      await tierList.reload({ transaction });
      if (tierList.voteCount < 0) {
        await tierList.update({ voteCount: 0 }, { transaction });
      }

      await transaction.commit();

      // Reload after transaction is committed
      await tierList.reload();

      return Response.json({
        status: 200,
        result: true,
        data: {
          voteCount: tierList.voteCount,
        },
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Vote transaction error:", error);
      throw error;
    }
  } catch (e) {
    console.error("Vote handler error:", e);
    return Response.json(
      { message: "Something went wrong", error: e?.message },
      { status: 500 }
    );
  }
}

export { handlePost as POST };
