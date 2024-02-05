import { PickStage } from "../const/stages";

export type Attribute = "agi" | "str" | "all" | "int";

export enum ConfigTypes {
  "picks",
  "audio",
}

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

export type Config = {
  id: string;
  date: Date;
  type: ConfigTypes;
};

export type ConfigAudioMap = { [key: string]: string[] };

export type ConfigAudio = Config & {
  type: ConfigTypes.audio;
  config: ConfigAudioMap;
};

export type ConfigPicks = Config & {
  type: ConfigTypes.picks;
  config: PickStage[];
};
