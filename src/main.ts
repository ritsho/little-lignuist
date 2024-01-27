import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TranslatedWord } from './app/translated-word';

export enum LanguageEnum {
  Hebrew,
  English,
}

export class WordsCategory {
  name: string;
  id: number;
  last_change_date: Date;
  target_lang: LanguageEnum;
  origin_lang: LanguageEnum;
  words: TranslatedWord[] = [];

  constructor(name: string, id: number, last_change_date: Date,
    target_lang: LanguageEnum, origin_lang: LanguageEnum,
    words: TranslatedWord[]) {

    this.name = name;
    this.id = id;
    this.last_change_date = last_change_date;
    this.target_lang = target_lang;
    this.origin_lang = origin_lang;
    this.words = words;
  }
}



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
