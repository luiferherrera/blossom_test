import { Log } from '../models/Log';

export interface LogPort {
  save(log: Log): Promise<void>;
}