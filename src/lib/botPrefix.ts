import { Message } from "discord.js";

import { ClientInstance } from "./core";

export const commandPrefix = process.env.COMMAND_PREFIX ?? "!!";

export const botShouldRespond = (message: Message): boolean =>
  prefixRegex().test(message.content) &&
  !message.partial &&
  !message.author.bot &&
  message.author !== ClientInstance.user;

export const mentionOrPrefix = (message: Message): string => {
  const matchedPrefix = message.content.match(prefixRegex());
  if (matchedPrefix) {
    return matchedPrefix[1];
  } else {
    return "";
  }
};

const prefixRegex = (): RegExp => {
  return new RegExp(
    `^(<@!?${ClientInstance.user?.id}>|${escapeRegex(commandPrefix)})\\s*`,
    "ui",
  );
};

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
