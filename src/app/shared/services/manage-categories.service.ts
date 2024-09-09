import { WordsCategory } from './../model/words-category';
import { inject, Injectable } from '@angular/core';
import {
  collection,
  DocumentSnapshot,
  Firestore,
  getDocs,
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

  get(id: number) {
    // let cat = this.firestoreService.
    let category = localStorage.getItem(id.toString());
    if (category != null) {
      return JSON.parse(category);
    }
    throw new Error('get() id ' + id.toString() + ' not found in localStorage');
  }

  async list(): Promise<WordsCategory[]> {
    const collectionConenction = collection(
      this.firestoreService,
      'Category'
    ).withConverter(CategoryConverter);
    console.log(collectionConenction);

    const querySnapshot = await getDocs(collectionConenction);
    let result: WordsCategory[] = [];
    querySnapshot.docs.forEach(
      (oneDocument: DocumentSnapshot<WordsCategory>) => {
        const data = oneDocument.data();
        if (data) {
          console.log(data);
          result.push(data);
        }
      }
    );

    return result;
  }
}
