export class Metadata {
  id: number | null;
  name: string | null;

  constructor(id: number | null, name: string | null,) {
    this.id = id;
    this.name = name;

    if (id === null && name === null) {
      throw new Error("An id or name must be provided");
    }
  }
}
