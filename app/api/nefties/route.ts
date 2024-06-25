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

async function handlePost(req: NextRequest) {
  const { name, image, description, element, slug, skills } = await req.json();
  try {
    if (
      !name ||
      !image ||
      !description ||
      !element ||
      !slug ||
      !skills ||
      skills.length === 0
    ) {
      return new Response("Missing info", {
        status: 500,
      });
    }

    const newNeftie = await models.Nefties.create({
      name,
      description,
      element,
      image,
      slug,
      skills,
    });

    return Response.json({
      status: 201,
      success: true,
      data: newNeftie,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

async function handlePut(req: NextRequest) {
  const { id, name, image, description, element, slug, skills } =
    await req.json();
  try {
    if (
      !name ||
      !image ||
      !description ||
      !element ||
      !slug ||
      !skills ||
      skills.length === 0
    ) {
      return new Response("Missing info", {
        status: 500,
      });
    }

    const updateNeftie = await models.Nefties.update(
      {
        name,
        description,
        element,
        image,
        slug,
        skills,
      },
      {
        where: { id: id },
      }
    );

    return Response.json({
      status: 201,
      success: true,
      data: updateNeftie,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
export { handleGet as GET, handlePost as POST, handlePut as PUT };
