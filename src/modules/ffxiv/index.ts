import { oneLine } from "common-tags";

import { i18n } from "../../lib/i18n";

import { Whois } from "./commands/whois";

import { Module } from "../../interfaces/module";

export const FFXIV: Module = {
  title: "Final Fantasy XIV",
  description: i18n.__(oneLine`
    A collection of commands integrating with Final Fantasy XIV, the critically
    acclaimed MMORPG that allows you to play through the entirety of A Realm
    Reborn and the award-winning Heavensward expansion up to level 60 for FREE
    with no restrictions on playtime.
  `),
  commands: [Whois],

  async init() {},
};
