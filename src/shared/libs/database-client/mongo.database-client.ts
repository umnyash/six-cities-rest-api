import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';

const RETRIES_COUNT = 5;
const RETRY_INTERVAL = 1000;

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
    let attemptNumber = 0;

    while (attemptNumber < RETRIES_COUNT) {
      attemptNumber++;

      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('MongoDB connected.');
        return;
      } catch (error: unknown) {
        this.logger.error(error as Error, `MongoDB connection attempt ${String(attemptNumber)} failed.`);

        if (attemptNumber < RETRIES_COUNT) {
          this.logger.info(`Retrying MongoDB connection in ${String(RETRY_INTERVAL)} ms…`);
          await setTimeout(RETRY_INTERVAL);
        }
      }
    }

    throw new Error(`MongoDB connection failed after ${String(attemptNumber)} attempts.`);
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
