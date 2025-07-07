import { EntityPort } from "../domain/ports/EntityPort";
import { LogPort } from "../domain/ports/LogPort";
import { Entity } from "../domain/models/Entity";
import { Log } from "../domain/models/Log";
import { Metadata } from "../domain/models/Metadata";

export class FetchService {
  private readonly entity: EntityPort;
  private readonly logger: LogPort;

  constructor(entityPort: EntityPort, logPort: LogPort) {
    this.entity = entityPort;
    this.logger = logPort;
  }

  async execute(
    franchise: string,
    version: string,
    metadata: Metadata,
    config: any
  ): Promise<Entity> {
    try {
      const result = await this.entity.fetch(metadata, config);

      this.logger.save(
        new Log(
          franchise,
          version,
          metadata,
          new Date().toISOString(),
          "success"
        )
      );

      return result;
    } catch (error: any) {
      console.error(`Error fetching data for ${franchise}:`, error.message);

      this.logger.save(
        new Log(
          franchise,
          version,
          metadata,
          new Date().toISOString(),
          "fail",
          error.message
        )
      );
      throw error;
    }
  }
}
