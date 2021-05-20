// import { Client } from "@elastic/elasticsearch";
// import { GuildMember } from "discord.js";

import { oneLine } from "common-tags";

// import { debug, logger } from "../../lib/logger";
// import { ClientInstance } from "../../lib/core";
import { i18n } from "../../lib/i18n";

import { Avatar } from "./commands/avatar";
import { Ping } from "./commands/ping";

import { Module } from "../../interfaces/module";

export const Utilities: Module = {
  title: "Utilities",
  description: i18n.__(oneLine`
    Miscellaneous tools and functionality useful in the day-to-day operation of
    the bot.`),
  commands: [
    Avatar,
    Ping,
    // Prefix
  ],

  async init() {
    // const esClient = new Client({ node: "http://es:9200" });
    // ClientInstance.on("guildMemberUpdate", async (oldMember, newMember) => {
    //   if (oldMember.partial) await oldMember.fetch();
    //   const userChanges = Object.keys(newMember).flatMap((key) => {
    //     if (
    //       JSON.stringify(oldMember[key as keyof GuildMember]) !==
    //       JSON.stringify(newMember[key as keyof GuildMember])
    //     ) {
    //       return [
    //         {
    //           [key]: {
    //             prev: oldMember[key as keyof GuildMember],
    //             new: newMember[key as keyof GuildMember],
    //           },
    //         },
    //       ];
    //     } else {
    //       return [];
    //     }
    //   });
    //   logger.verbose("User change detected");
    //   debug.verbose({
    //     id: newMember.id,
    //     ...userChanges,
    //   });
    //   const esResponse = await esClient.index({
    //     index: "user_changes",
    //     body: {
    //       userId: newMember.id,
    //       ...userChanges,
    //     },
    //   });
    //   logger.verbose(esResponse);
    //   return esResponse;
    // });
  },
};
