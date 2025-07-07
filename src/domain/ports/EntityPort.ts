import { Entity } from "../models/Entity";
import { Metadata } from "../models/Metadata";

export interface EntityPort {
  fetch(metadata: Metadata, config: any): Promise<Entity>;
}