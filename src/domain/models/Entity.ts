export class Entity {
  name: string;
  weight: number | null;
  powers: string[];
  evolutions: string[];

  constructor(
    name: string,
    weight: number | null,
    powers: string[],
    evolutions: string[]
  ) {
    this.name = name;
    this.weight = weight;
    this.powers = powers;
    this.evolutions = evolutions;
  }
}
