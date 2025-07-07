import axios from "axios";
import { Entity } from "../../../domain/models/Entity";
import { EntityPort } from "../../../domain/ports/EntityPort";
import { Metadata } from "../../../domain/models/Metadata";

export class DigimonApiAdapter implements EntityPort {

  async fetch(metadata: Metadata, config: any): Promise<Entity> {
    const baseUrl = config.baseUrl ?? "https://digi-api.com/api/v1";
    const name = metadata.id ?? metadata.name;
    const url = `${baseUrl}/digimon/${name}`;
    const headers = config.headers ?? {};

    const res = await axios.get(url, { headers });
    const digi = res.data;

    const powers = digi.skills?.map((skill: any) => skill.skill);
    const evolutions = digi.nextEvolutions?.map((evolution: any) => evolution.digimon);

    return new Entity(
      digi.name,
      null,
      powers,
      evolutions
    );
  }
}