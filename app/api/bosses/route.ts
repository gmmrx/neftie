import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import axios from "axios";

const statUrl = process.env.NEFTIE_STAT_API;

async function handleGet(req: NextRequest) {
  try {
    const bosses = await models.Bosses.findAll({
      order: [
        ["type", "ASC"],
        ["name", "ASC"],
      ],
    });

    if (!bosses || bosses.length === 0) {
      return new Response("Boss list is empty", {
        status: 404,
      });
    }

    // Fetch latest battles for each boss
    const bossesWithBattles = await Promise.all(
      bosses.map(async (boss) => {
        const neftieKey =
          boss.type === "BOSS"
            ? boss.neftie
            : boss.name
                .toLowerCase()
                .replace(/\belite\b/, "")
                .trim();
        console.log("neftieKey --> ", neftieKey);
        const formattedType = boss.type === "BOSS" ? "Boss" : "Elite";
        const url = `${statUrl}/battles/get-boss-battles/${formattedType}/${neftieKey}`;
        try {
          const response = await axios.get(url);
          return { ...boss.toJSON(), latestBattles: response.data };
        } catch (error) {
          console.error(`Error fetching battles for ${boss.name}:`, error);
          return { ...boss.toJSON(), latestBattles: [] };
        }
      })
    );

    // Group bosses by type
    const groupedBosses = bossesWithBattles.reduce(
      (acc, boss) => {
        if (!acc[boss.type]) {
          acc[boss.type] = [];
        }
        acc[boss.type].push(boss);
        return acc;
      },
      {} as { [key: string]: typeof bossesWithBattles }
    );

    return Response.json({
      status: 200,
      success: true,
      data: {
        ELITE: groupedBosses.ELITE || [],
        BOSS: groupedBosses.BOSS || [],
      },
    });
  } catch (error) {
    console.error("Error fetching bosses:", error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
