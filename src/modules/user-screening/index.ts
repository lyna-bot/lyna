import { oneLine } from "common-tags";

import { i18n } from "../../lib/i18n";

import { Accept } from "./commands/accept";

import { Module } from "../../interfaces/module";

export const UserScreening: Module = {
  title: "User Screening",
  description: i18n.__(oneLine`
    A collection of tools to gate a community against bots, trolls, and other
    external threats.
  `),
  commands: [Accept],

  async init() {},
};
