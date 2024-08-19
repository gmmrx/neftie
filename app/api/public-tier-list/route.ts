import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import { CURRENT_PATCH_VERSION } from "@/lib/data/constants";

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

    // Fetch Neftie names based on IDs
    const neftieIds = [
      ...tiers.sTier,
      ...tiers.aTier,
      ...tiers.bTier,
      ...tiers.cTier,
      ...tiers.dTier,
    ];

    const nefties = await models.Nefties.findAll({
      where: { id: neftieIds },
      attributes: ["id", "name"],
    });

    const neftieMap = new Map(nefties.map((n) => [n.id, n.name]));

    // Replace IDs with names
    tiers = {
      sTier: tiers.sTier.map((id) => neftieMap.get(id)),
      aTier: tiers.aTier.map((id) => neftieMap.get(id)),
      bTier: tiers.bTier.map((id) => neftieMap.get(id)),
      cTier: tiers.cTier.map((id) => neftieMap.get(id)),
      dTier: tiers.dTier.map((id) => neftieMap.get(id)),
    };

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
export { handleGet as GET };
