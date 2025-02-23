import { type NextRequest, NextResponse as Response } from "next/server";
import { models, sequelize } from "@/lib/db";

async function handlePost(req: NextRequest) {
  try {
    const { userId, tierListId, vote } = await req.json();

    if (!userId || !tierListId) {
      return new Response("Missing required parameters.", { status: 400 });
    }

    const tierList = await models.UserTierList.findByPk(tierListId);

    if (!tierList) {
      return new Response("Tier list not found.", { status: 404 });
    }

    const transaction = await sequelize.transaction();

    try {
      const existingVote = await models.TierListVote.findOne({
        where: {
          tierListId,
          userId,
        },
      });

      if (existingVote) {
        // If vote hasn't changed, do nothing
        if (existingVote.vote === vote) {
          await transaction.rollback();
          return new Response(
            JSON.stringify({
              status: 200,
              result: true,
              data: { voteCount: tierList.voteCount },
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        // Update the vote record
        await existingVote.update({ vote }, { transaction });

        // Update the vote count - just change by 2 to flip the vote
        // If going from upvote to downvote: -2
        // If going from downvote to upvote: +2
        const changeAmount = vote ? 1 : -1;
        await tierList.increment("voteCount", {
          by: changeAmount,
          transaction,
        });
      } else {
        // Create new vote
        await models.TierListVote.create(
          {
            tierListId,
            userId,
            vote,
          },
          { transaction }
        );

        // For new votes, just add or subtract 1
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

      await tierList.reload();

      return new Response(
        JSON.stringify({
          status: 200,
          result: true,
          data: {
            voteCount: tierList.voteCount,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (e) {
    console.error(e);
    return new Response("something_went_wrong", {
      status: 500,
    });
  }
}

export { handlePost as POST };
