import { Message } from "discord.js";
import { oneLine } from "common-tags";

import { ClientInstance, RedisInstance } from "../../lib/core";
import { i18n } from "../../lib/i18n";

import { Module } from "../../interfaces/module";

export const Analytics: Module & {
  logUserActivity: (message: Message) => void;
} = {
  title: "Analytics",
  description: i18n.__(oneLine`
    Records information on useful activity for later use, such as a user's
    activity.
  `),

  init(): void {
    ClientInstance.on("message", (message) => this.logUserActivity(message));
  },

  logUserActivity(message) {
    RedisInstance.zadd(
      `latestActivity:${message.guild?.id}`,
      message.createdTimestamp,
      message.member?.id as string,
    );
    RedisInstance.zincrby(
      `messageCount:${message.guild?.id}`,
      1,
      message.member?.id as string,
    );
  },
};
