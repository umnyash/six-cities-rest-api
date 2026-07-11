import { config } from 'dotenv';

import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';

export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;

  constructor(
    private readonly logger: Logger,
  ) {
    const { parsed, error } = config();

    if (error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist.');
    }

    if (parsed) {
      this.config = parsed;
      this.logger.info('.env file found and successfully parsed.');
    } else {
      throw new Error('Parsed output is undefined.');
    }
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
