export type Attribute = "agi" | "str" | "all" | "int";

export type Hero = {
  id: number;
  primary_attr: Attribute;
  img: string;
  localized_name: string;
};
