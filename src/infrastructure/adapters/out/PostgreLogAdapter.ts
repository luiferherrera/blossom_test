import { LogPort } from "../../../domain/ports/LogPort";
import { Log } from "../../../domain/models/Log";
import { Pool } from "pg";

export class PostgreSQLLogAdapter implements LogPort {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  async save(log: Log): Promise<void> {
    const query = `INSERT INTO logs 
      (franchise, version, metadata_id, metadata_name, timestamp, status, error_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [
      log.franchise,
      log.version,
      log.metadata.id ?? null,
      log.metadata.name ?? null,
      log.timestamp,
      log.status,
      log.errorMessage ?? null,
    ];

    try {
      await this.pool.query(query, values);
    } catch (error) {
      console.error("Error saving log to the database:", error);
      throw error;
    }
  }
}
