import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

export enum LanguageEnum {
  Hebrew,
  English,
}

export interface WordsCategory {
  name: string;
  id: number;
  last_change_date: Date;
  target_lang: LanguageEnum;
  origin_lang: LanguageEnum;
  zugot: Map<string,string>;
}

export const LIST_OF_CATEGORIES = [
  {
    name: "Food", id: 1, last_change_date: new Date("1/1/2024"),
    origin_lang: LanguageEnum.English, target_lang: LanguageEnum.Hebrew,
    zugot: new Map<string, string>([["Apple", "תפוח"], ["Orange", "תפוז"], ["Banana", "בננה"], ["Strawberry", "תות"]])
  },
  {
    name: "Family", id: 2, last_change_date: new Date("1/8/2023"),
    origin_lang: LanguageEnum.English, target_lang: LanguageEnum.Hebrew,
    zugot: new Map<string, string>([["Father", "אבא"], ["Mother", "אמא"], ["Family", "משפחה"]])
  },
  {
    name: "Animals", id: 3, last_change_date: new Date("1/5/2022"),
    origin_lang: LanguageEnum.English, target_lang: LanguageEnum.Hebrew,
    zugot: new Map<string, string>([["Dog", "כלב"], ["Elephant", "פיל"], ["Cat", "חתול"]])
  }
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
