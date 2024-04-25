import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  try {
    // Fetch Eggs and include associated Nefties
    const eggsWithNefties = await models.Eggs.findAll({
      include: [
        {
          model: models.Nefties, // Ensure this matches the model name as defined in your associations setup
          as: "eggs", // This 'as' value should match the alias you used in your association definition
          attributes: ["name", "slug"],
          through: { attributes: [] }, // Optionally hide the join table attributes
        },
      ],
    });

    if (!eggsWithNefties.length) {
      return new Response("Egg list is empty", {
        status: 404,
      });
    }

    return Response.json({ status: 200, result: true, data: eggsWithNefties });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
