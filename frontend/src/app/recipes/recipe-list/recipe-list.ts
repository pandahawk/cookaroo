import {Component} from '@angular/core';
import {Recipe, RecipeService} from '../recipe.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,) {
  }

  get recipes() {
    return this.recipeService.recipes();
  }

  load() {
    this.recipeService.recipes();
  }

  get homeMode() {
    return this.recipeService.goHome();
  }

  onRecipeClick(r: Recipe) {
    console.log("Card clicked:", r.title);
    this.router.navigate(['/recipes', r.id]);
  }
}
