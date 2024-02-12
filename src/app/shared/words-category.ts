import { TranslatedWord } from "./translated-word";
import { LanguageEnum } from "./language-enum";

export class WordsCategory {
    name: string;
    id: number;
    lastChangeDate: Date;
    targetLang: LanguageEnum;
    originLang: LanguageEnum;
    words: TranslatedWord[] = [];
  
    constructor(name: string, id: number, 
      targetLang: LanguageEnum, originLang: LanguageEnum,
      words: TranslatedWord[]) {
  
      this.name = name;
      this.id = id;
      this.lastChangeDate = new Date();
      this.targetLang = targetLang;
      this.originLang = originLang;
      this.words = words;
    }
  }
  