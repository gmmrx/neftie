import { type NextRequest, NextResponse as Response } from "next/server";

import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  try {
    const nefties = await models.Nefties.findAll();
    if (!nefties) {
      return new Response("Neftie list is empty", {
        status: 403,
      });
    }
    return Response.json({ status: 200, result: true, data: nefties });
  } catch (e) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

async function handlePut(req: NextRequest) {
  try {
  } catch (error) {}
}
export { handleGet as GET, handlePut as PUT };
