import { getLocaleFromNavigator, init, register } from "svelte-i18n";

register("no-NB", () => import("./locales/no-NB.json"));
register("en-US", () => import("./locales/en-US.json"));

init({
	fallbackLocale: "no-NB",
	initialLocale: getLocaleFromNavigator(),
});
