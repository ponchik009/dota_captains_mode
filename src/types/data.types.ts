export type Attribute = "agi" | "str" | "all" | "int";

export type Hero = {
  id: number;
  primary_attr: Attribute;
  img: string;
  localized_name: string;
};

export type User = {
  id: string;
  profile: {
    steamid: string;
    personaname: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
  };
};
