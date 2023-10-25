import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Select } from 'antd'
import React, { useState, useEffect } from 'react';

import { TRANSLATIONS_VN } from "./vn/translations";
import { TRANSLATIONS_EN } from "./en/translations";
 
i18n
 .use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     vn: {
       translation: TRANSLATIONS_VN
     }
   },
   fallbackLng: 'en',
 });

 export const LocaleSwitch = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const onChange = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, []);

  const locales = [
    { value: 'en', label: '🇺🇸' },
    { value: 'vn', label: '🇻🇳' },
  ];

  return (
    <Select options={locales} value={selectedLanguage} onChange={onChange} />
  );
};
