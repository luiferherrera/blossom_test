import { Log } from "../../../domain/models/Log";
import { LogPort } from "../../../domain/ports/LogPort";

export class InMemoryLogAdapter implements LogPort {
  private readonly logs: Log[] = [];

  async save(log: Log): Promise<void> {
    this.logs.push(log);
    console.log("Request log saved:", log);
  }
}