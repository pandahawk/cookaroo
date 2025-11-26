import {Component} from '@angular/core';
import {Recipe, RecipeService} from './recipe.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-recipes',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgClass,
    MatButton
  ],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  constructor(private readonly recipeService: RecipeService) {
  }

  get recipes() {
    return this.recipeService.recipes();
  }

  load() {
    this.recipeService.recipes();
  }

  get homeMode() {
    return this.recipeService.homeMode();
  }

  onRecipeClick(r: Recipe) {
    console.log("Card clicked:", r.title);
  }
}
