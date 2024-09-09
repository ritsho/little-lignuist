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

@Injectable({
  providedIn: 'root',
})
export class ManageCategoriesService {
  private firestoreService = inject(Firestore);

  constructor() {}

  add(category: WordsCategory) {
    //   let nextId = this.getNextId();
    //   // save word category
    //   category.id = nextId;
    //   localStorage.setItem(category.id.toString(), JSON.stringify(category));
    //   // save the nextID value
    //   nextId++;
    //   localStorage.setItem("nextId", nextId.toString())
    // }
  }

  delete(id: string) {
    if (localStorage.getItem(id.toString()) != null) {
      localStorage.removeItem(id.toString());
    } else {
      throw new Error(
        'delete() id ' + id.toString() + ' not found in localStorage'
      );
    }
  }

  update(category: WordsCategory) {
    if (localStorage.getItem(category.id.toString()) != null) {
      category.lastChangeDate = new Date();
      localStorage.setItem(category.id.toString(), JSON.stringify(category));
      console.log(category);
      console.log(JSON.stringify(category));
    } else {
      throw new Error(
        'update() id ' + category.id.toString() + ' not found in localStorage'
      );
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
    let result: WordsCategory[] = [];
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
