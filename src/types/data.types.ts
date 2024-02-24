import { PickStage } from "../const/stages";

// #region heroes
export type Attribute = "agi" | "str" | "all" | "int";

export type Hero = {
  id: number;
  primary_attr: Attribute;
  img: string;
  localized_name: string;
};

// #endregion heroes

// #region user
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
// #endregion user

// #region config
export enum ConfigTypes {
  "picks",
  "audio",
}

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
// #endregion config

// #region lobby
export enum CreateLobbySideEnum {
  RADIANT = "radiant",
  DIRE = "dire",
  ANY = "any",
}

export enum CreateLobbyTypeEnum {
  CLOSE = "close",
  OPEN = "open",
}

export type CreateLobbyData = {
  type: CreateLobbyTypeEnum;
  side: CreateLobbySideEnum;
};

export enum LobbyStatusEnum {
  WAIT = "wait",
  PLAY = "play",
  END = "end",
}

export type LobbyPlayer = {
  id: string;
  side: Exclude<CreateLobbySideEnum, CreateLobbySideEnum.ANY>;
  player: { id: string; steamId: string };
};

export type Lobby = {
  id: string;
  date: Date;
  status: LobbyStatusEnum;
  type: CreateLobbyTypeEnum;
  players: LobbyPlayer[];
};
// #endregion lobby
