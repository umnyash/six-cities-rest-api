import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return CommandName.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    try {
      const fileReader = new TSVFileReader(filename.trim());
      fileReader.read();
      console.log(fileReader.parseOffers());
    } catch (error: unknown) {

      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${error.message}`);
    }
  }
}
