import { Attribute, Hero } from "./data.types";

export type SidesType = "dire" | "radiant";

export type PickBan = "pick" | "ban";

export type GroupedHeroes = {
  [key in Attribute]: Hero[];
};

export type PickedHero = {
  hero: Hero;
  order: number;
  side: SidesType;
  type: PickBan;
};
