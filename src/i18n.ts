import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from './locales/en.json'

const getLanguage = () => {
  const lang = 'en' // 常规浏览器语言和IE浏览器
  const localStorageLang = localStorage.getItem('lang')
  return localStorageLang || lang
}
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    }
  },

  lng: getLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
