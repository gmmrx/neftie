import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";

async function handlePost(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("You do not have permission to do this action.", {
      status: 500,
    });
  }

  try {
    const { userId, patchVersion, sTier, aTier, bTier } = await req.json();

    const isUserVotedForThisPatch = await models.UserTierList.findOne({
      where: { userId: userId, patchVersionId: patchVersion },
    });
    if (isUserVotedForThisPatch) {
      return new Response("already_voted_tier", {
        status: 500,
      });
    }

    const addNewRecord = await models.UserTierList.create({
      userId,
      patchVersionId: patchVersion,
      sTier,
      aTier,
      bTier,
    });
    if (addNewRecord) {
      return Response.json({
        status: 200,
        result: true,
        data: addNewRecord,
      });
    } else {
      return new Response("cant_add_record", {
        status: 500,
      });
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
      attributes: ["sTier", "aTier", "bTier"],
    });

    // Initialize a map to keep track of each Neftie's weighted scores and appearances
    let neftieScores = new Map();

    userTierLists.forEach((submission) => {
      ["sTier", "aTier", "bTier"].forEach((tier, tierIndex) => {
        const weight = (3 - tierIndex) * 100; // Weighting: S=300, A=200, B=100
        submission[tier].forEach((neftieId, index) => {
          const score = weight - index;
          if (!neftieScores.has(neftieId)) {
            neftieScores.set(neftieId, []);
          }
          neftieScores.get(neftieId).push(score);
        });
      });
    });

    let averages = [];
    neftieScores.forEach((scores, neftieId) => {
      const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      averages.push({ neftieId, averageScore });
    });

    averages.sort((a, b) => b.averageScore - a.averageScore);

    // Assuming the distribution logic for tier categorization based on average scores
    const tierThresholds = {
      sTier: 250, // Example threshold, adjust based on your scoring system
      aTier: 150,
    };

    // Initialize tiers
    let tiers = { sTier: [], aTier: [], bTier: [] };

    // Distribute Nefties into tiers based on their average scores
    averages.forEach(({ neftieId, averageScore }) => {
      if (averageScore >= tierThresholds.sTier) {
        tiers.sTier.push(neftieId);
      } else if (averageScore >= tierThresholds.aTier) {
        tiers.aTier.push(neftieId);
      } else {
        tiers.bTier.push(neftieId);
      }
    });

    return Response.json({
      status: 200,
      result: true,
      data: {
        ...tiers,
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("something_went_wrong", {
      status: 500,
    });
  }
}

export { handlePost as POST, handleGet as GET };
