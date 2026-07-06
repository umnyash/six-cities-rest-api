import { CommandName } from './commands/command-name.enum.js';
import { Command } from './commands/command.interface.js';
import { CommandParser } from './command.parser.js';
import { stylizeErrorMessage } from './cli.styles.js';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommandName = CommandName.Help,
  ) { }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(stylizeErrorMessage(`Command ${command.getName()} is already registered.`));
      }

      this.commands[command.getName()] = command;
    });
  }

  public async processCommand(argv: string[]): Promise<void> {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    await command.execute(...commandArguments);
  }

  private getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  private getDefaultCommand(): Command | never {
    if (!Object.hasOwn(this.commands, this.defaultCommandName)) {
      throw new Error(stylizeErrorMessage(`The default command (${this.defaultCommandName}) is not registered.`));
    }

    return this.commands[this.defaultCommandName];
  }
}
