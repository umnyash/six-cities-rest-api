type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommandName = '';

    cliArguments.forEach((argument) => {
      if (argument.startsWith('--')) {
        parsedCommand[argument] = [];
        currentCommandName = argument;
      } else if (currentCommandName && argument) {
        parsedCommand[currentCommandName].push(argument);
      }
    });

    return parsedCommand;
  }
}
