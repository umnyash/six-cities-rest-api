import { inject, injectable } from 'inversify';

import { Component } from '../shared/types/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) { }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`PORT environment variable: ${String(this.config.get('PORT'))}`);
  }
}
