import axios from "axios";
import { Socket, io } from "socket.io-client";

import { API_URL } from "../const/env";
import {
  ConfigAudio,
  ConfigPicks,
  CreateLobbyData,
  Lobby,
  User,
} from "../types/data.types";

export interface ServerToClientEvents {
  joined_lobby: ({ lobby, users }: { lobby: Lobby; users: User[] }) => void;
}

export interface ClientToServerEvents {
  join_lobby: (id: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "localhost:3002",
  {
    withCredentials: true,
    transports: ["websocket", "polling", "flashsocket"],
  }
);

export class CaptainsApi {
  private static instance = axios.create({
    baseURL: API_URL,
  });

  public static async auth() {
    return await CaptainsApi.instance
      .get<User>("/auth", {
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  public static async login() {
    return await CaptainsApi.instance
      .get<User>("/auth/login")
      .then((response) => response.data);
  }

  public static async fetchConfigAudio() {
    return await CaptainsApi.instance
      .get<ConfigAudio>("/captains-config/audio/last")
      .then((response) => response.data.config);
  }

  public static async fetchConfigPicks() {
    return await CaptainsApi.instance
      .get<ConfigPicks>("/captains-config/picks/last")
      .then((response) => response.data.config);
  }

  public static async createLobby(dto: CreateLobbyData) {
    return await CaptainsApi.instance
      .post<Lobby>("/lobby", dto, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  public static async fetchLobbyById(id: string) {
    return await CaptainsApi.instance
      .get<Lobby>(`/lobby/${id}`, {
        withCredentials: true,
      })
      .then((response) => response.data);
  }

  // public static async joinLobby(id: string) {
  //   return CaptainsApi.socket.emit("join_lobby", id);
  // }
}
