import { Offer } from '../../shared/types/index.js';
import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { getErrorMessage } from '../../shared/utils/index.js';
import { TSVFileReader, FileReaderEventName } from '../../shared/libs/file-reader/index.js';
import { stylizeSuccessMessage, stylizeErrorMessage } from '../cli.styles.js';

export class ImportCommand implements Command {
  public getName(): string {
    return CommandName.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;

    try {
      const fileReader = new TSVFileReader(filename.trim());
      fileReader.on(FileReaderEventName.Line, this.onLineRead.bind(this));
      fileReader.once(FileReaderEventName.End, this.onReadingEnd.bind(this));
      await fileReader.read();
    } catch (error: unknown) {
      console.error(stylizeErrorMessage(`Can't import data from file: ${filename}`));
      console.error(stylizeErrorMessage(getErrorMessage(error)));
    }
  }

  private onLineRead(offer: Offer): void {
    console.info(offer);
  }

  private onReadingEnd(count: number): void {
    console.info(stylizeSuccessMessage(`${String(count)} rows imported.`));
  }
}
