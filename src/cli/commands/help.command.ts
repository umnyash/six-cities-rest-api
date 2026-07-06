import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { stylizeHeading, stylizeUrl, stylizeCommandName, stylizeCommandArguments } from '../cli.styles.js';

export class HelpCommand implements Command {
  public getName(): string {
    return CommandName.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${stylizeHeading('Программа для подготовки данных для REST API сервера.')}

        Использование:
            ${stylizeUrl('cli.js')} ${stylizeCommandName('--<command>')} ${stylizeCommandArguments('[--arguments]')}

        Команды:
            ${stylizeCommandName(CommandName.Version)}:                     # выводит номер версии
            ${stylizeCommandName(CommandName.Help)}:                        # печатает этот текст
            ${stylizeCommandName(CommandName.Import)} ${stylizeCommandArguments('<path>')}:               # импортирует данные из TSV
            ${stylizeCommandName(CommandName.Generate)} ${stylizeCommandArguments('<n> <path> <url>')}:   # генерирует заданное количество тестовых данных
    `);
  }
}
