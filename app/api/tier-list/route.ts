import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

import { getServerSession } from "next-auth/next";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";
import { authOptions } from "@/lib/authOptions";

import { customAlphabet } from "nanoid";

// Custom alphabet for generating the slug (only lowercase letters and numbers)
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8); // Generate an 8-character slug

async function generateUniqueSlug() {
  // Generate a new slug
  const slug = nanoid();

  // Check if the slug already exists in the database
  const existingSlug = await models.UserTierList.findOne({
    where: { slug },
  });

  // If the slug exists, recursively generate a new one
  if (existingSlug) {
    return generateUniqueSlug();
  }

  // Return the unique slug
  return slug;
}

async function handlePost(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("You do not have permission to do this action.", {
      status: 500,
    });
  }

  try {
    const { userId, patchVersion, sTier, aTier, bTier, cTier, dTier } =
      await req.json();

    const isUserVotedForThisPatch = await models.UserTierList.findOne({
      where: { userId: userId, patchVersionId: patchVersion },
    });
    const slug = await generateUniqueSlug();
    if (isUserVotedForThisPatch) {
      // Update the existing record
      const updatedRecord = await isUserVotedForThisPatch.update({
        sTier,
        aTier,
        bTier,
        cTier,
        dTier,
      });

      return new Response(
        JSON.stringify({
          status: 200,
          result: true,
          data: updatedRecord,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      const addNewRecord = await models.UserTierList.create({
        userId,
        patchVersionId: patchVersion,
        sTier,
        aTier,
        bTier,
        cTier,
        dTier,
        slug,
      });

      if (addNewRecord) {
        return new Response(
          JSON.stringify({
            status: 200,
            result: true,
            data: addNewRecord,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response("cant_add_record", {
          status: 500,
        });
      }
    }
  } catch (e) {
    console.error(e);
    return new Response("something_went_wrong", {
      status: 500,
    });
  }
}
async function handleGet(req: NextRequest) {
  try {
    // Fetch all UserTierLists for the specific patch version
    const userTierLists = await models.UserTierList.findAll({
      where: { patchVersionId: CURRENT_PATCH_VERSION },
      attributes: ["sTier", "aTier", "bTier", "cTier", "dTier"],
    });

    // Initialize a map to keep track of each Neftie's weighted scores and appearances
    let neftieScores = new Map();

    userTierLists.forEach((submission) => {
      ["sTier", "aTier", "bTier", "cTier", "dTier"].forEach(
        (tier, tierIndex) => {
          const weight = (4 - tierIndex) * 100; // Weighting: S=400, A=300, B=200, C=100, D=0
          submission[tier].forEach((neftieId, index) => {
            const score = weight - index;
            if (!neftieScores.has(neftieId)) {
              neftieScores.set(neftieId, []);
            }
            neftieScores.get(neftieId).push(score);
          });
        }
      );
    });


    let averages = [];
    neftieScores.forEach((scores, neftieId) => {
      const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      averages.push({ neftieId, averageScore });
    });

    // Sort Nefties by average score in descending order
    averages.sort((a, b) => b.averageScore - a.averageScore);


    // Assuming the distribution logic for tier categorization based on average scores
    const tierThresholds = {
      sTier: 300, // Example threshold, adjust based on your scoring system
      aTier: 200,
      bTier: 100,
    };

    // Initialize tiers
    let tiers = { sTier: [], aTier: [], bTier: [], cTier: [], dTier: [] };

    // Distribute Nefties into tiers based on their average scores
    averages.forEach(({ neftieId, averageScore }) => {
      if (averageScore >= tierThresholds.sTier) {
        tiers.sTier.push(neftieId);
      } else if (averageScore >= tierThresholds.aTier) {
        tiers.aTier.push(neftieId);
      } else if (averageScore >= tierThresholds.bTier) {
        tiers.bTier.push(neftieId);
      } else if (averageScore >= 0) {
        // Assuming scores can be zero or positive
        tiers.cTier.push(neftieId);
      } else {
        tiers.dTier.push(neftieId);
      }
    });

    return new Response(
      JSON.stringify({
        status: 200,
        result: true,
        data: {
          ...tiers,
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

export { handlePost as POST, handleGet as GET };
