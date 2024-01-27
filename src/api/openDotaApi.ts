import axios from "axios";
import { Hero } from "../types/data.types";

export class OpenDotaApi {
  public static getHeroes() {
    return axios
      .get<Hero[]>("https://api.opendota.com/api/heroStats")
      .then((response) =>
        response.data.map((h) => ({
          ...h,
          img: `https://cdn.cloudflare.steamstatic.com${h.img}`,
        }))
      );
  }
}
