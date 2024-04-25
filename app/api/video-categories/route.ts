import { type NextRequest, NextResponse as Response } from "next/server";

import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  try {
    const categories = await models.VideoCategory.findAll();
    if (!categories) {
      return new Response("Category list is empty", {
        status: 403,
      });
    }
    return Response.json({ status: 200, result: true, data: categories });
  } catch (e) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
