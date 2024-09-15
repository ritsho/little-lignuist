import { WordsCategory } from './../model/words-category';
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
import { CategoryConverter } from '../converters/category-converter';

@Injectable({
  providedIn: 'root',
})
export class ManageCategoriesService {
  private firestoreService = inject(Firestore);

  constructor() {}

  async add(category: WordsCategory): Promise<void> {
    const collectionConenction = collection(
      this.firestoreService,
      'Category'
    ).withConverter(CategoryConverter);

    await addDoc(collectionConenction, category);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.firestoreService, 'Category', id));
  }

  async update(category: WordsCategory): Promise<void> {
    const docRef = doc(
      this.firestoreService,
      'Category',
      category.id
    ).withConverter(CategoryConverter);

    try {
      await setDoc(docRef, category, { merge: true });
      console.log('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  }

  async get(id: string): Promise<WordsCategory | undefined> {
    const docRef = doc(this.firestoreService, 'Category', id).withConverter(
      CategoryConverter
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const category = docSnap.data() as WordsCategory;
      console.log('Category data:', category);
      return category;
    } else {
      console.log('No such Category!');
      return undefined;
    }
  }

  async list(): Promise<WordsCategory[]> {
    const collectionConenction = collection(
      this.firestoreService,
      'Category'
    ).withConverter(CategoryConverter);

    const querySnapshot = await getDocs(collectionConenction);
    const result: WordsCategory[] = [];
    querySnapshot.docs.forEach(
      (oneDocument: DocumentSnapshot<WordsCategory>) => {
        const data = oneDocument.data();
        if (data) {
          result.push(data);
        }
      }
    );

    return result;
  }
}
