import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { LanguageEnum, WordsCategory } from '../../main';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatedWord } from '../translated-word';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManageCategoriesService } from '../manage-categories.service';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-edit-category',
  standalone: true,
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, NgFor, MatIconModule, MatFormFieldModule,
    MatInputModule, MatButtonModule]
})
export class EditCategoryComponent {

  categoryToEdit: WordsCategory = new WordsCategory("name", 0, new Date(), LanguageEnum.Hebrew, LanguageEnum.English, [new TranslatedWord("Test", "בדיקה")]);

  constructor(private route: ActivatedRoute, private mc: ManageCategoriesService, private router: Router) {
    let id = this.route.snapshot.paramMap.get('id');

    // if we fail to get the id, we use the fallback (new category...)
    if (id != null){
      let idAsNumber = parseInt(id);
      let wordsCategory = mc.get(idAsNumber);
      if (wordsCategory != null){
        this.categoryToEdit = wordsCategory;
      }
    }
  }

  onAddNewWord() {
    this.categoryToEdit.words.push(new TranslatedWord("", ""));
  }

  deleteItem(translatedWord: TranslatedWord) {
    let newArr = this.categoryToEdit.words.filter(item => item !== translatedWord);
    this.categoryToEdit.words = newArr;
  }

  save() {
    // TODO: add validations:
    // 1. check that this category name is NOT already exist
    if (this.categoryToEdit.name == "") {
      alert("Error - category must have a name");
      return;
    }

    // check that there's at least ONE TranslatedWord before saving
    if (this.categoryToEdit.words.length == 0 ||
      this.categoryToEdit.words.find(item => item.origin.trim() === "") ||
      this.categoryToEdit.words.find(item => item.target.trim() === "")) {
      alert("Error - must have at least one valid pair, and all pairs should be filled");
      return;
    }

    // if this category is NEW
    if (this.categoryToEdit.id == 0) {

      // update the ID, and save
      this.mc.add(this.categoryToEdit);
    }

    // go to home page
    this.router.navigate(['']);
  }
}
