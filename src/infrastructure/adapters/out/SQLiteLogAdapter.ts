import { LogPort } from "../../../domain/ports/LogPort";
import { Log } from "../../../domain/models/Log";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export class SQLiteLogAdapter implements LogPort {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  constructor(dbPath: string = "./logs.db") {
    this.init(dbPath);
  }

  private async init(dbPath: string) {
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        franchise TEXT NOT NULL,
        version TEXT NOT NULL,
        metadata_id INTEGER,
        metadata_name TEXT,
        timestamp TEXT NOT NULL,
        status TEXT NOT NULL,
        error_message TEXT
      )
    `);
  }

  async save(log: Log): Promise<void> {
    const query = `
      INSERT INTO logs 
        (franchise, version, metadata_id, metadata_name, timestamp, status, error_message)
      VALUES 
        (?, ?, ?, ?, ?, ?, ?)
    `
    try {
      await this.db.run(query,
        log.franchise,
        log.version,
        log.metadata.id ?? null,
        log.metadata.name ?? null,
        log.timestamp,
        log.status,
        log.errorMessage ?? null
      );
    } catch (error: any) {
      console.error("Error saving log to the database:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}
