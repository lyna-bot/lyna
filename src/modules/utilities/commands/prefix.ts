import { oneLine } from "common-tags";

import { ClientInstance } from "../../../lib/core";
import { commandPrefix } from "../../../lib/botPrefix";
import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

export const Prefix: Command = {
  trigger: "prefix",
  description: i18n.__(oneLine`
    Returns the prefix the bot is currently listening on. This can be useful as
    the bot also responds to mentions, not just the defined prefix.
  `),
  usage: "",

  async execute(message) {
    await message.channel.send(
      `
        ${i18n.__(
          oneLine`
          I'll respond if you start a message with \`{{ prefix }}\` or
          <@!{{ botID }}>, plus a command I know about. For
          example, you can trigger this message with **{{ prefix }}prefix** or
          **<@!{{ botID }}> prefix.**
        `,
          { prefix: commandPrefix, botID: ClientInstance.user?.id ?? "" },
        )}
      `,
    );
  },
};
