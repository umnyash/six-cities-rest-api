import { WriteStream, createWriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    const needsDrain = !this.stream.write(`${row}\n`);

    if (needsDrain) {
      await new Promise<void>((resolve) => {
        this.stream.once('drain', resolve);
      });
    }
  }
}
