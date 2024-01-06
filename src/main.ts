import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

export enum LanguageEnum {
  Hebrew,
  English,
}

export interface WordsCategoryInterface {
  name: string;
  id: number;
  last_change_date: Date;
  target_lang: LanguageEnum;
  origin_lang: LanguageEnum;
  zugot: Map<string, string>;
}

export class WordsCategory implements WordsCategoryInterface {
  name: string;
  id: number;
  last_change_date: Date;
  target_lang: LanguageEnum;
  origin_lang: LanguageEnum;
  zugot: Map<string, string>;

  constructor(name: string, id: number, last_change_date: Date,
    target_lang: LanguageEnum, origin_lang: LanguageEnum,
    zugot: Map<string, string>) {

    this.name = name;
    this.id = id;
    this.last_change_date = last_change_date;
    this.target_lang = target_lang;
    this.origin_lang = origin_lang;
    this.zugot = zugot;
  }
}

export const LIST_OF_CATEGORIES: WordsCategory[] = [
  new WordsCategory("Food", 1, new Date("1/1/2024"),
    LanguageEnum.English, LanguageEnum.Hebrew,
    new Map<string, string>([["Apple", "תפוח"], ["Orange", "תפוז"], ["Banana", "בננה"], ["Strawberry", "תות"]])),

  new WordsCategory("Family", 2, new Date("1/8/2023"),
    LanguageEnum.English, LanguageEnum.Hebrew,
    new Map<string, string>([["Father", "אבא"], ["Mother", "אמא"], ["Family", "משפחה"]])),

  new WordsCategory("Animals", 3, new Date("1/5/2022"),
    LanguageEnum.English, LanguageEnum.Hebrew,
    new Map<string, string>([["Dog", "כלב"], ["Elephant", "פיל"], ["Cat", "חתול"]]))
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
