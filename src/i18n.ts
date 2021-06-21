import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zh from './locales/zh-CN.json'

const getLanguage = () => {
  const lang = 'zh' // 常规浏览器语言和IE浏览器
  const localStorageLang = localStorage.getItem('lang')
  const defaultLang = localStorageLang || lang
  return defaultLang
}
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },

  lng: getLanguage(),
  // lng: 'zh',
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
