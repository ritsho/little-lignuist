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

@Component({
  selector: 'app-edit-category',
  standalone: true,
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, NgFor, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class EditCategoryComponent {

  categoryToEdit: WordsCategory = new WordsCategory("name", 1, new Date(), LanguageEnum.Hebrew, LanguageEnum.English, [new TranslatedWord("Test", "בדיקה")]);

  constructor(private route: ActivatedRoute, private mc: ManageCategoriesService, private router: Router) {
    //this.contactId = this.route.snapshot.paramMap.get('id');
  }

  onAddNewWord() {
    this.categoryToEdit.words.push(new TranslatedWord("", ""));
  }

  deleteItem(translatedWord: TranslatedWord) {
    let newArr = this.categoryToEdit.words.filter(item => item !== translatedWord);
    this.categoryToEdit.words = newArr;
  }

  save() {
    // TODO: add validation: check that this category name is NOT already exist
    
    this.mc.add(this.categoryToEdit);
    this.router.navigate(['']);
  }
}
