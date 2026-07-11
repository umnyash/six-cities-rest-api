import { Config } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly config: Config,
    private readonly logger: Logger,
  ) { }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`PORT environment variable: ${String(this.config.get('PORT'))}`);
  }
}
