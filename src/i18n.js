import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n.use(Backend).use(initReactI18next).init({
    fallbackLng: 'fr',
    debug: true,
});

export default i18n;
