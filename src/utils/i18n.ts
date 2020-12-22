import { I18n } from "i18n";
import { URL } from "url";
import path from "path";

const i18n = new I18n();
i18n.configure({
  directory: path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../locales",
  ),
});

export { i18n };
