import { vsprintf } from "sprintf-js";
import { getLanguage } from "./language-guess";

export interface ITranslation {
  [key: string]: string;
}

export const l = (translation: ITranslation, ...rest: string[]) => {
  return translate(getLanguage(), translation, ...rest);
};

export const translate = (
  language: string,
  translation: ITranslation,
  ...rest: string[]
) => {
  try {
    return vsprintf(translation[language], rest);
  } catch (error) {
    console.log(error, "Could not translate key");
    return "[INVALID TRANSLATION]";
  }
};

export * from "./language-guess";
export { k } from "./translations";
