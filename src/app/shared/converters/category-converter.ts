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
    const wordsObj = Object.entries(wordsCategory.words).map(([_, words]) => ({
      origin: words.origin,
      target: words.target,
    }));
    console.log('toFirestore', wordsObj);

    return {
      name: wordsCategory.name,
      // id: wordsCategory.id,
      lastChangeDate: wordsCategory.lastChangeDate,
      targetLang: LanguageEnumConverter.getIntFromLang(
        wordsCategory.targetLang
      ),
      originLang: LanguageEnumConverter.getIntFromLang(
        wordsCategory.originLang
      ),
      words: wordsObj,
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
