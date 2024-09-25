import { type NextRequest, NextResponse as Response } from "next/server";
import { models } from "@/lib/db";
import axios from "axios";

async function handleGet(req: NextRequest) {
  try {
    // Fetch recent sales
    const salesResponse = await axios.get(
      "https://marketplace-v2-public-api.live.aurory.io/v1/sales?source=LISTING&item_collection_types=NEFTIE&unit_price_gte=1&order_by=createdAt%2CDESC",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseArray: string | any[] = [];
    for (const sale of salesResponse.data.data) {
      const itemId = sale.item_id;
      if (sale.type === "LISTING_SOLD_COMPLETELY") {
        try {
          // Fetch item details using the item_id
          const itemResponse = await axios.get(
            `https://items-public-api.live.aurory.io/v1/items/${itemId}`
          );
          const itemDetails = itemResponse.data ? itemResponse.data : {};
          responseArray.push({ ...sale, ...itemDetails });
        } catch (error) {
          continue;
        }
      }
    }

    return Response.json({
      status: 200,
      result: true,
      data: responseArray,
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
