import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client is already connected.');
    }

    this.logger.info('Connecting to MongoDB…');

    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;

    this.logger.info('MongoDB connected.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('MongoDB client is not connected.');
    }

    await this.mongoose.disconnect();
    this.isConnected = false;
    this.logger.info('MongoDB disconnected.');
  }
}
