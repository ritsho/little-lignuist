import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@angular/fire/firestore';
import { WordsCategory } from '../model/words-category';
import { LanguageEnumConverter } from '../model/language-enum';
import { TranslatedWord } from '../model/translated-word';

export const CategoryConverter: FirestoreDataConverter<WordsCategory> = {
  // בשמירה צריך להמיר ל JSON
  toFirestore: (wordsCategory: WordsCategory) => {
    const wordsObj = Object.entries(wordsCategory.words).map(([, words]) => ({
      origin: words.origin,
      target: words.target,
    }));
    console.log('toFirestore', wordsObj);

    return {
      name: wordsCategory.name,
      // id: wordsCategory.id,
      lastChangeDate: Timestamp.fromDate(wordsCategory.lastChangeDate),
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
    const targetLang = LanguageEnumConverter.getLangFromInt(
      <number>data['targetLang']
    );
    const originLang = LanguageEnumConverter.getLangFromInt(
      <number>data['originLang']
    );
    const result = new WordsCategory(
      data['name'],
      snapshot.id,
      targetLang,
      originLang,
      []
    );
    result.lastChangeDate = data['lastChangeDate'].toDate();

    const words = data['words'];
    if (words) {
      for (const word of words) {
        result.words.push(new TranslatedWord(word['origin'], word['target']));
      }
    }
    return result;
  },
};
