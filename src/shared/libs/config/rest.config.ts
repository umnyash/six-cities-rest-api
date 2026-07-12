import { config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { Component } from '../../types/index.js';
import { RestSchema, restSchema } from './rest.schema.js';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    const { error } = config();

    if (error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist.');
    }

    restSchema.load({});

    restSchema.validate({
      allowed: 'strict',
      output: this.logger.info.bind(this.logger),
    });

    this.config = restSchema.getProperties();
    this.logger.info('.env file found and successfully parsed.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
