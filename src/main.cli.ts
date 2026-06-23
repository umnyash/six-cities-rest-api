import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  cliApplication.registerCommands([
    new HelpCommand(),
    new ImportCommand(),
    new VersionCommand(),
  ]);

  await cliApplication.processCommand(process.argv);
}

await bootstrap();
