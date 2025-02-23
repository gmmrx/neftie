import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import axios from "axios";

const statUrl = process.env.NEFTIE_STAT_API;

async function handleGet(req: NextRequest) {
  try {
    // Fetch Eggs and include associated Nefties
    const eggsWithNefties = await models.Eggs.findAll({
      include: [
        {
          model: models.Nefties,
          as: "eggs",
          attributes: ["name", "slug"],
          through: { attributes: [] },
        },
      ],
    });

    if (!eggsWithNefties.length) {
      return new Response("Egg list is empty", { status: 404 });
    }

    // Fetch stats for each egg
    const eggsWithStats = await Promise.all(
      eggsWithNefties.map(async (egg) => {
        try {
          const { data: statsData } = await axios.get(
            `${statUrl}/eggs/stats/${egg.name}%20Egg`
          );

          return {
            ...egg.toJSON(),
            stats: statsData.statistics || {
              standardCount: 0,
              primeCount: 0,
              totalQuantity: 0,
            },
            recentHatches: statsData.recentHatches,
          };
        } catch (error) {
          console.error(`Error fetching stats for egg ${egg.name}:`, error);
          // Return egg with default stats if fetch fails
          return {
            ...egg.toJSON(),
            stats: {
              standardCount: 0,
              primeCount: 0,
              totalQuantity: 0,
            },
            recentHatches: [],
          };
        }
      })
    );

    return Response.json({
      status: 200,
      result: true,
      data: eggsWithStats,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", { status: 500 });
  }
}

export { handleGet as GET };
