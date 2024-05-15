import { type NextRequest, NextResponse as Response } from "next/server";
import slugify from "slugify";
import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return new Response("Where is the slug buddy", {
      status: 500,
    });
  }
  try {
    const event = await models.Events.findOne({
      where: { slug: slug },
      include: [{ model: models.EventDetails, as: "details" }],
    });
    if (!event) {
      return new Response("No event with that slug", {
        status: 500,
      });
    }
    return Response.json({
      status: 200,
      result: true,
      data: event,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
