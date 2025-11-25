import {Component, } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RecipeService} from '../../recipes/recipe.service';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatButton
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {

  constructor(private readonly recipeService: RecipeService) {}

  load() {
    this.recipeService.listRecipes();
  }

  get loading(): boolean {
    return this.recipeService.loading();   // call the signal here
  }

}
