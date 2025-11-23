import {
	getLocaleFromNavigator,
	init,
	locale,
	locales,
	register,
} from "svelte-i18n";

register("no-NB", () => import("./locales/no-NB.json"));
register("en-US", () => import("./locales/en-US.json"));

locales.subscribe(console.log);
init({
	fallbackLocale: "no-NB",
	initialLocale: getLocaleFromNavigator(),
});
