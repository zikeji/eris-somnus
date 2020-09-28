import parser from "yargs-parser";

export interface ParserCommandArgument {
  name: string;
  type: "string";
}

export interface ParserCommandOption {
  name: string;
  aliases: string[];
  type: "string";
}

export interface CommandOptions {
  name: string;
  aliases?: string[];
  arguments?: ParserCommandArgument[];
  options?: ParserCommandOption[];
}

export default abstract class BotCommand {
  name: string;
  aliases?: string[];
  arguments: ParserCommandArgument[] = [];
  options: ParserCommandOption[] = [];

  constructor(options: CommandOptions) {
    this.name = options.name;
    this.aliases = options.aliases || [];
  }

  public abstract run(message: unknown, params: any): Promise<void>;

  // eslint-disable-next-line class-methods-use-this
  protected parse(input: string): unknown {
    const argv = parser(input);
    return argv;
  }

  public handle(input: string, message: unknown): Promise<void> {
    const commandTrigger = input
      .toLowerCase()
      .startsWith(this.name.toLowerCase())
      ? this.name.toLowerCase()
      : (this.aliases || []).find((alias) =>
          input.toLowerCase().startsWith(alias.toLowerCase())
        ) || "";
    const args = this.parse(input.slice(commandTrigger.length));
    return this.run(message, args);
  }

  static getCommand(commands: BotCommand[], input: string): BotCommand {
    // eslint-disable-next-line no-restricted-syntax
    for (const command of commands) {
      if (
        input.toLowerCase().startsWith(command.name.toLowerCase()) ||
        (command.aliases &&
          command.aliases.some((alias) =>
            input.toLowerCase().startsWith(alias.toLowerCase())
          ))
      ) {
        return command;
      }
    }
    throw Error("Invalid.");
  }
}
