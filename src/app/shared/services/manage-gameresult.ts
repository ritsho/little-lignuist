import { inject, Injectable } from '@angular/core';
import {
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { GameResult } from '../model/game-result';
import { GameResultConverter } from '../converters/game-result-converter';

@Injectable({
  providedIn: 'root',
})
export class ManageGameResultsService {
  private firestoreService = inject(Firestore);

  async addGameResult(gameResult: GameResult): Promise<void> {
    const collectionConenction = collection(
      this.firestoreService,
      'GameResults'
    ).withConverter(GameResultConverter);

    await addDoc(collectionConenction, gameResult);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.firestoreService, 'GameResults', id));
  }

  async update(id: string, gameResult: GameResult): Promise<void> {
    const docRef = doc(this.firestoreService, 'GameResults', id).withConverter(
      GameResultConverter
    );

    try {
      await setDoc(docRef, gameResult, { merge: true });
      console.log('GameResults updated successfully');
    } catch (error) {
      console.error('Error updating GameResults:', error);
    }
  }

  async get(id: string): Promise<GameResult | undefined> {
    const docRef = doc(this.firestoreService, 'GameResults', id).withConverter(
      GameResultConverter
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const gameResult = docSnap.data() as GameResult;
      console.log('GameResults data:', gameResult);
      return gameResult;
    } else {
      console.log('No such GameResults!');
      return undefined;
    }
  }

  async list(): Promise<GameResult[]> {
    const collectionConenction = collection(
      this.firestoreService,
      'GameResults'
    ).withConverter(GameResultConverter);

    const querySnapshot = await getDocs(collectionConenction);
    const result: GameResult[] = [];
    querySnapshot.docs.forEach((oneDocument: DocumentSnapshot<GameResult>) => {
      const data = oneDocument.data();
      if (data) {
        result.push(data);
      }
    });

    return result;
  }
}
