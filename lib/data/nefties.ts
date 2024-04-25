export interface Neftie {
  id: number;
  name: string;
  description: string;
  element: string;
  releaseDate?: string;
  image: string;
  slug: string;
  skills: {
    icon: string;
    name: string;
    description: string;
  }[];
}

export const NeftieList: Neftie[] = [
  {
    id: 0,
    name: "Bitebit",
    description: "bitebit.description",
    element: "lightning",
    image: "https://images.cdn.aurory.io/nefties/bitebit/mythic-medium.png",
    slug: "bitebit",
    skills: [
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_NormalIcon.png",
        name: "bitebit.skills[0].name",
        description: "bitebit.skills[0].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_ThunderIcon.png",
        name: "bitebit.skills[1].name",
        description: "bitebit.skills[1].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_PlantIcon.png",
        name: "bitebit.skills[2].name",
        description: "bitebit.skills[2].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_ThunderIcon.png",
        name: "bitebit.skills[3].name",
        description: "bitebit.skills[3].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_ThunderIcon.png",
        name: "bitebit.skills[4].name",
        description: "bitebit.skills[4].description",
      },
    ],
  },
  {
    id: 1,
    name: "Dipking",
    description: "dipking.description",
    element: "water",
    image: "https://images.cdn.aurory.io/nefties/dipking/mythic-medium.png",
    slug: "dipking",
    skills: [
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_NormalIcon.png",
        name: "dipking.skills[0].name",
        description: "dipking.skills[0].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_WaterIcon.png",
        name: "dipking.skills[1].name",
        description: "dipking.skills[1].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_WaterIcon.png",
        name: "dipking.skills[2].name",
        description: "dipking.skills[2].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_WaterIcon.png",
        name: "dipking.skills[3].name",
        description: "dipking.skills[3].description",
      },
      {
        icon: "https://images.cdn.aurory.io/icons/elements/UI_WaterIcon.png",
        name: "dipking.skills[4].name",
        description: "dipking.skills[4].description",
      },
    ],
  },
 
];
