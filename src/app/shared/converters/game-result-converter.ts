import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { GameResult } from '../model/game-result';

export const GameResultConverter: FirestoreDataConverter<GameResult> = {
  // בשמירה צריך להמיר ל JSON
  toFirestore: (gameResult: GameResult) => {
    return {
      categoryId: gameResult.categoryId,
      gameId: gameResult.gameId,
      date: gameResult.date,
      score: gameResult.score,
    };
  },
  // בטעינה צריך להמיר מ JSON
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): GameResult => {
    const data = snapshot.data(options);
    return {
      categoryId: data['categoryId'],
      gameId: data['gameId'],
      date: data['date'].toDate(),
      score: data['score'],
    };
  },
};
