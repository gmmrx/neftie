import { type NextRequest, NextResponse as Response } from "next/server";
import { promises as fs } from "fs";

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
  try {
    const file = await fs.readFile(
      process.cwd() + `/locales/${language}/nefties.json`,
      "utf8"
    );
    const data = JSON.parse(file);

    const nefties = await models.Nefties.findAll();

    if (!nefties) {
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
