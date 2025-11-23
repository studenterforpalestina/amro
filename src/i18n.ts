import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('no-NB', () => import('./locales/no-NB.json'));
register('en', () => import('./locales/en.json'));

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
