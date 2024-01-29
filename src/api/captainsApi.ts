import axios from "axios";
import { API_URL } from "../const/env";
import { User } from "../types/data.types";

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
}
