import { type NextRequest, NextResponse as Response } from "next/server";
import { models, sequelize } from "@/lib/db";

import { getServerSession } from "next-auth/next";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { authOptions } from "@/lib/authOptions";

import { customAlphabet } from "nanoid";
import slugify from "slugify";

// Custom alphabet for generating the slug (only lowercase letters and numbers)
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8); // Generate an 8-character slug

async function generateUniqueSlug(title) {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug;
  slug = `${baseSlug}-${nanoid()}`;
  return slug;
}

async function handlePost(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json(
      { message: "You do not have permission to do this action." },
      { status: 403 }
    );
  }

  try {
    const { userId, title, description, tiers, patchVersion } =
      await req.json();
    if (!userId || !title || !tiers || !Array.isArray(tiers)) {
      return Response.json({ message: "Invalid input data." }, { status: 400 });
    }

    const generatedSlug = await generateUniqueSlug(title);

    // Correct transaction initialization
    const transaction = await sequelize.transaction();

    try {
      // Create UserTierList with initial voteCount of 1
      const newTierList = await models.UserTierList.create(
        {
          userId,
          title,
          description,
          patchVersionId: patchVersion,
          slug: generatedSlug,
          voteCount: 1, // Initialize with 1 vote from the creator
        },
        { transaction }
      );

      // Create an automatic upvote for the creator
      await models.TierListVote.create(
        {
          tierListId: newTierList.id,
          userId: userId,
          vote: true, // true for upvote
        },
        { transaction }
      );

      // Insert Tiers and TierItems
      for (const tier of tiers) {
        const createdTier = await models.Tier.create(
          {
            name: tier.name,
            color: tier.color,
            tierListId: newTierList.id, // Ensure this matches the model's foreign key
          },
          { transaction }
        );

        const tierItemsData = tier.items.map((itemId) => ({
          tierId: createdTier.id,
          neftieId: itemId,
        }));

        await models.TierItem.bulkCreate(tierItemsData, { transaction });
      }

      await transaction.commit();

      return Response.json(
        { status: 200, result: true, data: newTierList },
        { status: 200 }
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Transaction failed:", error);
      return Response.json(
        { message: "Failed to save tier list.", error: error?.message },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("Error in tier list creation:", e);
    return Response.json(
      { message: "Something went wrong.", error: e?.message },
      { status: 500 }
    );
  }
}

export { handlePost as POST };
