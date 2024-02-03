import { Injectable } from '@angular/core';
import { TranslatedWord } from './translated-word';
import { WordsCategory } from './shared/WordsCategory';
import { LanguageEnum } from './shared/LanguageEnum';

@Injectable({
  providedIn: 'root'
})
export class ManageCategoriesService {

  constructor() { }

  allCategories: Map<number, WordsCategory> = new Map([
    [1, new WordsCategory("Food", 1, 
          LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Apple", "תפוח"), new TranslatedWord("Orange", "תפוז"), new TranslatedWord("Banana", "בננה"), new TranslatedWord("Strawberry", "תות")])],

    [2, new WordsCategory("Family", 2,
      LanguageEnum.English, LanguageEnum.Hebrew,
      [new TranslatedWord("Father", "אבא"), new TranslatedWord("Mother", "אמא"), new TranslatedWord("Family", "משפחה")])],

    [3, new WordsCategory("Animals", 3,
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
    category.lastChangeDate = new Date();
    // TODO? update in map
  }

  get(id: number) {
    return this.allCategories.get(id);
  }
  
  getall() {
    return Array.from(this.allCategories.values());
  }
}

