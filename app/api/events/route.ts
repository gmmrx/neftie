import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  try {
    const events = await models.Events.findAll({
      include: [{ model: models.EventDetails, as: "details" }],
    });

    return Response.json({
      status: 200,
      result: true,
      data: events,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

async function handlePost(req: NextRequest) {
  const data = await req.json();

  try {
    const events = await models.Events.create(
      {
        name: data.name,
        startsAt: data.starts_at,
        endsAt: data.ends_at,
        isOfficial: false,
        status: "PENDING",
        details: {
          description: data.description,
          discordUrl: data.discord_url,
          prizes: data.prizes,
          rules: data.rules,
          language: data.language,
        },
      },
      {
        include: [{ model: models.EventDetails, as: "details" }],
      }
    );

    return Response.json({
      status: 200,
      result: true,
      data: events,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handlePost as POST, handleGet as GET };
