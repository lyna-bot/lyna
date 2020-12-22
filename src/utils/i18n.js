import { I18n } from "i18n";
import path from "path";

export const i18n = new I18n({
  directory: path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../locales",
  ),
});
