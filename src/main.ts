import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

export enum Language {
  Hebrew,
  English,
}

export class WordsCategory {
  name: string;
  id: number;
  last_change_date: Date;
  target_lang: Language;
  origin_lang: Language;
  zugot: Map<string,string>;

  constructor(name: string, id: number, last_change_date: Date, 
              origin_lang: Language, target_lang: Language, 
              zugot: Map<string,string>) {
    this.name = name;
    this.id = id;
    this.last_change_date = last_change_date;
    this.origin_lang = origin_lang;
    this.target_lang = target_lang;
    this.zugot = zugot;
  }
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
