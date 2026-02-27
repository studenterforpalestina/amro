import { getLocaleFromNavigator, init, register } from 'svelte-i18n';
import noNB from './locales/no-NB.json';

register('no-NB', () => Promise.resolve(noNB));
register('en-US', () => import('./locales/en-US.json'));

init({
	fallbackLocale: 'no-NB',
	initialLocale: getLocaleFromNavigator()
});
