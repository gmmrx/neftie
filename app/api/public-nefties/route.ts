import { type NextRequest, NextResponse as Response } from "next/server";
import { promises as fs } from "fs";
import path from "path";

import { models } from "@/lib/db";
import { ElementList } from "@/lib/data/elements";

function findNeftiesByElement(targetElement, nefties) {
  // Identify the relationships for the target element
  const element = ElementList.find((e) => e.name === targetElement);
  if (!element) throw new Error("Element not found");

  const { good_against, bad_against, neutral_against } = element;

  // Filter Nefties based on the identified relationships
  const good = nefties
    .filter((neftie) => good_against.includes(neftie.element))
    .map((neftie) => neftie.name);
  const bad = nefties
    .filter((neftie) => bad_against.includes(neftie.element))
    .map((neftie) => neftie.name);
  const neutral = nefties
    .filter((neftie) => neutral_against.includes(neftie.element))
    .map((neftie) => neftie.name);

  return { good, bad, neutral };
}

async function handleGet(req: NextRequest) {
  const language = req.nextUrl.searchParams.get("lang") || "en";
  const name = req.nextUrl.searchParams.get("name");
  try {
    const filePath = path.resolve(
      process.cwd(),
      `locales/${language}/nefties.json`
    );
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    let nefties;
    if (name) {
      const neftie = await models.Nefties.findOne({ where: { slug: name } });
      if (!neftie) {
        return new Response(`Neftie named "${name}" not found`, {
          status: 404,
        });
      }
      nefties = [neftie];
    } else {
      nefties = await models.Nefties.findAll();
    }

    if (!nefties || nefties.length === 0) {
      return new Response("Neftie list is empty", {
        status: 403,
      });
    }

    const translatedNefties = nefties.map((neftie) => {
      const neftieData = neftie.get({ plain: true });
      const { name, description, skills, ...rest } = neftieData;
      const translation = data[name.replace(" ", "-").toLowerCase()];

      const { good, bad, neutral } = findNeftiesByElement(
        neftieData.element,
        nefties
      );

      return {
        ...rest,
        name: data[name] || name,
        description: translation?.description || description,
        skills: skills.map((skill, index) => ({
          ...skill,
          name: translation?.skills?.[index]?.name || skill.name,
          description:
            translation?.skills?.[index]?.description || skill.description,
        })),
        good_against: good,
        bad_against: bad,
        neutral_against: neutral,
      };
    });

    return Response.json({
      status: 200,
      result: true,
      data: translatedNefties,
    });
  } catch (e) {
    console.log(e);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export { handleGet as GET };
