import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filepath = 'package.json',
  ) { }

  public getName(): string {
    return CommandName.Version;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filepath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filepath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }
}
