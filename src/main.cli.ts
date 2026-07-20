#!/usr/bin/env node
import {
  CLIApplication,
  GenerateCommand,
  HelpCommand,
  ImportCommand,
  VersionCommand,
} from './cli/index.js';

import { MongoDatabaseClient } from './shared/libs/database-client/index.js';
import { ConsoleLogger } from './shared/libs/logger/index.js';
import { OfferModel, DefaultOfferService } from './shared/modules/offer/index.js';
import { UserModel, DefaultUserService } from './shared/modules/user/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  const logger = new ConsoleLogger();
  const databaseClient = new MongoDatabaseClient(logger);
  const userService = new DefaultUserService(UserModel, logger);
  const offerService = new DefaultOfferService(OfferModel, logger);

  cliApplication.registerCommands([
    new GenerateCommand(),
    new HelpCommand(),
    new ImportCommand(databaseClient, userService, offerService),
    new VersionCommand(),
  ]);

  await cliApplication.processCommand(process.argv);
}

await bootstrap();
