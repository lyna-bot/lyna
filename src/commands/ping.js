/**
 * @module
 * @namespace Lyna
 * @name Ping
 *
 * The simplest possible command. Simply responds to its command with "Ping!"
 *
 * Usage: {p}ping
 */
export const Ping = {
  name: "ping",
  description: "Ping!",
  execute(message) {
    message.channel.send("Pong.");
  },
};
