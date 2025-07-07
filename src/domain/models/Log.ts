import { Metadata } from "./Metadata";

export class Log {
  franchise: string;
  version: string;
  metadata: Metadata;
  timestamp: string;
  status: string; // "success" | "fail"
  errorMessage?: string | null;

  constructor(
    franchise: string,
    version: string,
    metadata: Metadata,
    timestamp: string,
    status: string,
    errorMessage?: string
  ) {
    this.franchise = franchise;
    this.version = version;
    this.metadata = metadata;
    this.timestamp = timestamp;
    this.status = status;
    this.errorMessage = errorMessage;
  }
}
