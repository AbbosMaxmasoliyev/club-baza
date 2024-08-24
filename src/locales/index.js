import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import uz from './lang/uz.json'
import ru from './lang/ru.json'
import { themeConfig } from 'configs/theme.config'

const resources = {
    en: {
        translation: en
    },
    uz: {
        translation: uz
    },
    ru: {
        translation: ru
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: themeConfig.locale,
    lng: themeConfig.locale,
    interpolation: {
        escapeValue: false 
    }
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
    uz: () => import('dayjs/locale/uz'),
    ru: () => import('dayjs/locale/ru'),
}

export default i18n