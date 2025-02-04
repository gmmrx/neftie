import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

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

    // Group bosses by type
    const groupedBosses = bosses.reduce(
      (acc, boss) => {
        // Initialize the array for this type if it doesn't exist
        if (!acc[boss.type]) {
          acc[boss.type] = [];
        }

        // Add the boss to its type array
        acc[boss.type].push({
          id: boss.id,
          name: boss.name,
          image: boss.image,
          description: boss.description,
          hp: boss.hp,
          atk: boss.atk,
          def: boss.def,
          sp: boss.sp,
          lang: boss.lang,
          type: boss.type,
        });

        return acc;
      },
      {} as { [key: string]: typeof bosses }
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
