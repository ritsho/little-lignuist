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

  findMostPlayedCategory(gameResults: GameResult[]): string {
    const categoryCount: { [key: string]: number } = {};

    // Count occurrences of each categoryId
    gameResults.forEach((result) => {
      if (categoryCount[result.categoryId]) {
        categoryCount[result.categoryId]++;
      } else {
        categoryCount[result.categoryId] = 1;
      }
    });

    // Find the categoryId with the highest count
    let mostFrequentCategoryId: string = '';
    let maxCount = 0;

    for (const categoryId in categoryCount) {
      if (categoryCount[categoryId] > maxCount) {
        maxCount = categoryCount[categoryId];
        mostFrequentCategoryId = categoryId;
      }
    }

    return mostFrequentCategoryId;
  }

  getTotalDaysOnCurrentMonth(gameResults: GameResult[]): number {
    // count days played on last month (starting from 1st of current month)
    // count the days
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const totalGamesOnCurrentMonth = gameResults.filter((gr) => {
      const gameDate = new Date(gr.date);
      return gameDate >= firstDayOfCurrentMonth;
    }).length;

    return totalGamesOnCurrentMonth;
  }

  getDaysStrikeSinceToday(gameResults: GameResult[]): number {
    // go back in dates, until you find a day without a game
    // count how many consecutive days there were a game
    let daysStrike = 0;
    const currentDate = new Date();
    for (;;) {
      const gameOnDate = gameResults.find((gr) => {
        const gameDate = new Date(gr.date);
        return gameDate.getDate() == currentDate.getDate();
      });
      if (gameOnDate) {
        daysStrike++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return daysStrike;
  }
}
