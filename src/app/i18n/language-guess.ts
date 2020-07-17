export const DEFAULT_LANGUAGE = "EN";

const ANNOUNCEMENT_LANGUAGES = [DEFAULT_LANGUAGE, "DE", "PL", "SV", "ES", "FR"];
const AVAILABLE_LANGUAGES = [DEFAULT_LANGUAGE, "DE"];

const getBrowserLanguage = (): string => {
  const languageGuess = Array.isArray(window.navigator.languages)
    ? window.navigator.languages.find(Boolean)
    : window.navigator.language;

  if (languageGuess) {
    return languageGuess.split("-")[0].toUpperCase();
  }

  return DEFAULT_LANGUAGE;
};

const isInAvailableLanguages = (language: string) => {
  return AVAILABLE_LANGUAGES.includes(language.toUpperCase());
};

const isInAnnouncementLanguages = (language: string) => {
  return ANNOUNCEMENT_LANGUAGES.includes(language.toUpperCase());
};

export const getAnnouncementLanguage = (language: string) => {
  if (isInAnnouncementLanguages(language)) {
    return language.toUpperCase();
  } else {
    const browserLanguage = getBrowserLanguage();
    return isInAnnouncementLanguages(browserLanguage)
      ? browserLanguage
      : DEFAULT_LANGUAGE;
  }
};

export const getLanguage = () => {
  const browserLanguage = getBrowserLanguage();
  return isInAvailableLanguages(browserLanguage)
    ? browserLanguage
    : DEFAULT_LANGUAGE;
};
