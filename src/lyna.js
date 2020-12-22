import Discord from "discord.js";

const client = new Discord.Client();

/**
 * The main entry point for Lyna.
 *
 * Here, we log into Discord and set up anything else the bot needs to run
 * globally.
 */
export const Lyna = () => {
  client.once("ready", () => {
    console.log("Ready!");
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};
