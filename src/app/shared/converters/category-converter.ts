import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { WordsCategory } from '../model/words-category';
import { LanguageEnum, LanguageEnumConverter } from '../model/language-enum';

export const CategoryConverter: FirestoreDataConverter<WordsCategory> = {
  // בשמירה צריך להמיר ל JSON
  toFirestore: (wordsCategory: WordsCategory) => {
    console.log('toFirestore', wordsCategory);
    return {
      name: wordsCategory.name,
      // id: wordsCategory.id,
      lastChangeDate: wordsCategory.lastChangeDate,
      targetLang: <LanguageEnum>wordsCategory.targetLang,
      originLang: <LanguageEnum>wordsCategory.originLang,
      words: wordsCategory.words,
    };
  },
  // בטעינה צריך להמיר מ JSON
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): WordsCategory => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data['name'],
      lastChangeDate: data['lastChangeDate'].toDate(),
      targetLang: LanguageEnumConverter.getLangFromInt(
        <number>data['targetLang']
      ) as LanguageEnum,
      originLang: LanguageEnumConverter.getLangFromInt(
        <number>data['originLang']
      ) as LanguageEnum,
      words: data['words'],
    };
  },
};
