import { I18n } from "i18n";
import { URL } from "url";
import path from "path";

/**
 * Sets up internationalisation, allowing us to separate the bot's output so
 * that we can edit it in a single location, and/or translate it for other
 * locales.
 */
const i18n = new I18n();
i18n.configure({
  directory: path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../locales",
  ),
});

export { i18n };
