import { WordsCategory } from './../model/words-category';
import { inject, Injectable } from '@angular/core';
import {
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
  getDoc,
  doc,
} from '@angular/fire/firestore';
import { CategoryConverter } from '../converters/category-converter';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ManageCategoriesService {
  private firestoreService = inject(Firestore);

  constructor() {}

  async add(category: WordsCategory): Promise<void> {
    console.log(category);
    const collectionConenction = collection(
      this.firestoreService,
      'Category'
    ).withConverter(CategoryConverter);

    await addDoc(collectionConenction, category);
  }

  async delete(id: string): Promise<void> {
    console.log('delete id ', id);
    // if (localStorage.getItem(id.toString()) != null) {
    //   localStorage.removeItem(id.toString());
    // } else {
    //   throw new Error(
    //     'delete() id ' + id.toString() + ' not found in localStorage'
    //   );
    // }
  }

  async update(category: WordsCategory): Promise<void> {
    console.log('update category', category);
    // if (localStorage.getItem(category.id.toString()) != null) {
    //   category.lastChangeDate = new Date();
    //   localStorage.setItem(category.id.toString(), JSON.stringify(category));
    //   console.log(category);
    //   console.log(JSON.stringify(category));
    // } else {
    //   throw new Error(
    //     'update() id ' + category.id.toString() + ' not found in localStorage'
    //   );
    // }
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
