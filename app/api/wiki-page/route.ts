import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";

async function handleGet(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get("pageId");
  const language = req.nextUrl.searchParams.get("language") || "en";

  try {
    if (pageId) {
      const latestRevision = await models.WikiPage.getLatestRevision(
        parseInt(pageId, 10),
        language // Pass the language parameter to the function
      );

      return Response.json({
        status: 200,
        result: true,
        data: latestRevision,
      });
    }

    const latestPagesWithRevisions = await models.WikiPage.getLatestRevisions(
      10,
      language
    ); // Pass language to the function

    return Response.json({
      status: 200,
      result: true,
      data: latestPagesWithRevisions,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
