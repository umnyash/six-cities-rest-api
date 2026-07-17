import { inject, injectable } from 'inversify';

import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { buildMongoURI } from '../shared/utils/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.Logger) private readonly logger: Logger,
  ) { }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`PORT environment variable: ${String(this.config.get('PORT'))}`);

    this.logger.info('Database initialization…');
    await this.initDatabase();
    this.logger.info('Database initialization completed.')
  }

  private async initDatabase() {
    const mongoUri = buildMongoURI({
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      databaseName: this.config.get('DB_NAME'),
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
    });

    return this.databaseClient.connect(mongoUri);
  }
}
