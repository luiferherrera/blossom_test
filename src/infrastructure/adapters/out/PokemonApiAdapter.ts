import axios from "axios";
import { Entity } from "../../../domain/models/Entity";
import { EntityPort } from "../../../domain/ports/EntityPort";
import { Metadata } from "../../../domain/models/Metadata";

export class PokemonApiAdapter implements EntityPort {

  async fetch(metadata: Metadata, config: any): Promise<Entity> {
    const baseUrl = config.baseUrl ?? "https://pokeapi.co/api/v2";
    const name = metadata.id ?? metadata.name;
    const headers = config.headers ?? {};
    const url = `${baseUrl}/pokemon/${name}`;

    const res = await axios.get(url, { headers });
    const pokemon = res.data;
    const powers = pokemon.abilities?.map((a: any) => a.ability.name);

    const getEvolutions = async (pokemon: any, headers: any): Promise<string[]> => {
      if (!pokemon?.species?.url) return [];
      const species = await axios.get(pokemon.species.url, { headers });
      if (!species?.data?.evolution_chain?.url) return [];
      const chainRes = await axios.get(species.data.evolution_chain.url, { headers });
      const chain = chainRes.data.chain;

      const mapEvolutions = (node: any): string[] => {
        const names: string[] = [];
        if (node.evolves_to && node.evolves_to.length > 0) {
          node.evolves_to.forEach((evo: any) => {
            names.push(evo.species.name);
            names.push(...mapEvolutions(evo));
          });
        }
        return names;
      };

      return mapEvolutions(chain);

    };

    const evolutions = await getEvolutions(pokemon, headers);

    return new Entity(
      pokemon.name,
      pokemon.weight,
      powers,
      evolutions
    );
  }

}