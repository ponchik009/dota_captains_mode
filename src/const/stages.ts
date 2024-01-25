import { SignVertical } from "../components/OrderSign/OrderSign";
import { SidesType } from "../types/state.types";

export type Stage = "picks" | "bans";

export type PickBan = {
  vertical: SignVertical;
  order: number;
};

export type PickStage = {
  stage: number;
  type: Stage;
  dire: PickBan[];
  radiant: PickBan[];
};

export type OrderToSide = {
  [key: string]: SidesType;
};

export type OrderToStage = {
  [key: string]: number;
};

export const pickStages: PickStage[] = [
  {
    stage: 1,
    type: "bans",
    dire: [
      {
        vertical: "bottom",
        order: 2,
      },
      {
        vertical: "middle",
        order: 3,
      },
      {
        vertical: "middle",
        order: 5,
      },
      {
        vertical: "top",
        order: 6,
      },
    ],
    radiant: [
      {
        vertical: "top",
        order: 1,
      },
      {
        vertical: "middle",
        order: 4,
      },
      {
        vertical: "bottom",
        order: 7,
      },
    ],
  },
  {
    stage: 2,
    type: "picks",
    dire: [
      {
        order: 9,
        vertical: "bottom",
      },
    ],
    radiant: [
      {
        order: 8,
        vertical: "top",
      },
    ],
  },
  {
    stage: 3,
    type: "bans",
    dire: [
      {
        order: 12,
        vertical: "bottom",
      },
    ],
    radiant: [
      {
        order: 10,
        vertical: "middle",
      },
      {
        order: 11,
        vertical: "top",
      },
    ],
  },
  {
    stage: 4,
    type: "picks",
    dire: [
      {
        order: 13,
        vertical: "top",
      },
      {
        order: 16,
        vertical: "bottom",
      },
      {
        order: 17,
        vertical: "top",
      },
    ],
    radiant: [
      {
        order: 14,
        vertical: "bottom",
      },
      {
        order: 15,
        vertical: "top",
      },
      {
        order: 18,
        vertical: "bottom",
      },
    ],
  },
  {
    stage: 5,
    type: "bans",
    dire: [
      {
        order: 20,
        vertical: "bottom",
      },
      {
        order: 21,
        vertical: "top",
      },
    ],
    radiant: [
      {
        order: 19,
        vertical: "top",
      },
      {
        order: 22,
        vertical: "bottom",
      },
    ],
  },
  {
    stage: 6,
    type: "picks",
    dire: [
      {
        order: 24,
        vertical: "bottom",
      },
    ],
    radiant: [
      {
        order: 23,
        vertical: "top",
      },
    ],
  },
];

export const orderToSide = pickStages.reduce<OrderToSide>((acc, cur) => {
  cur.dire.forEach((pickBan) => (acc[String(pickBan.order)] = "dire"));
  cur.radiant.forEach((pickBan) => (acc[String(pickBan.order)] = "radiant"));

  return acc;
}, {});

export const orderToStage = pickStages.reduce<OrderToStage>((acc, cur) => {
  cur.dire.forEach((pickBan) => (acc[String(pickBan.order)] = cur.stage));
  cur.radiant.forEach((pickBan) => (acc[String(pickBan.order)] = cur.stage));

  return acc;
}, {});

export const maxPick = Math.max(...Object.keys(orderToSide).map((key) => +key));
