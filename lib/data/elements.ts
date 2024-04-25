import { NeftiesAttributes } from "@/models/Nefties";
import { Neftie, NeftieList } from "./nefties";

export interface Element {
  name: string;
  good_against: string[];
  bad_against: string[];
  neutral_against: string[];
}

export const ElementList: Element[] = [
  {
    name: "earth",
    good_against: ["lightning"],
    bad_against: ["air"],
    neutral_against: ["fire", "water", "plant"],
  },
  {
    name: "lightning",
    good_against: ["air", "water"],
    bad_against: ["earth", "plant"],
    neutral_against: ["fire"],
  },
  {
    name: "air",
    good_against: ["earth"],
    bad_against: ["lightning"],
    neutral_against: ["fire", "water", "plant"],
  },
  {
    name: "fire",
    good_against: ["plant"],
    bad_against: ["water"],
    neutral_against: ["earth", "lightning", "air"],
  },
  {
    name: "plant",
    good_against: ["water"],
    bad_against: ["fire"],
    neutral_against: ["earth", "lightning", "air"],
  },
  {
    name: "water",
    good_against: ["fire"],
    bad_against: ["plant", "lightning"],
    neutral_against: ["earth", "air"],
  },
];

export function findNeftiesByElement(
  targetElement: string,
  nefties: NeftiesAttributes[]
): {
  good: Neftie[];
  bad: Neftie[];
  neutral: Neftie[];
} {
  // Identify the relationships for the target element
  const element = ElementList.find((e) => e.name === targetElement);
  if (!element) throw new Error("Element not found");

  const goodAgainst = element.good_against;
  const badAgainst = element.bad_against;
  const neutralAgainst = element.neutral_against;

  // Filter Nefties based on the identified relationships
  const good = nefties.filter((neftie) =>
    goodAgainst.includes(neftie.element)
  );
  const bad = nefties.filter((neftie) =>
    badAgainst.includes(neftie.element)
  );
  const neutral = nefties.filter((neftie) =>
    neutralAgainst.includes(neftie.element)
  );

  return { good, bad, neutral };
}
