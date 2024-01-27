import { Injectable } from '@angular/core';
import { WordsCategory, LanguageEnum } from '../main';
import { TranslatedWord } from './translated-word';

@Injectable({
  providedIn: 'root'
})
export class ManageCategoriesService {

  constructor() { }

  allCategories: Map<number, WordsCategory> = new Map([
    [1, new WordsCategory("Food", 1, new Date("1/1/2024"),
      LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Apple", "תפוח"), new TranslatedWord("Orange", "תפוז"), new TranslatedWord("Banana", "בננה"), new TranslatedWord("Strawberry", "תות")])],

    [2, new WordsCategory("Family", 2, new Date("1/8/2023"),
      LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Father", "אבא"), new TranslatedWord("Mother", "אמא"), new TranslatedWord("Family", "משפחה")])],

    [3, new WordsCategory("Animals", 3, new Date("1/5/2022"),
      LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Dog", "כלב"), new TranslatedWord("Elephant", "פיל"), new TranslatedWord("Cat", "חתול")])]
  ]);

  add(category: WordsCategory) {
    category.id = this.allCategories.size + 1;
    this.allCategories.set(category.id, category);
  }

  delete(id: number) {
    if (this.allCategories.has(id)) {
      this.allCategories.delete(id);
    }
  }

  update(category: WordsCategory) {
    category.last_change_date = new Date();
    // TODO? update in map
  }

  get(id: number) {
    return this.allCategories.get(id);
  }
  
  getall() {
    return Array.from(this.allCategories.values());
  }
}

