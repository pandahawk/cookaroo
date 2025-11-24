import {Component, Signal} from '@angular/core';
import {Recipe, RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {


  // just read the signal from the service
  readonly recipes: Signal<Recipe[]>;

  constructor(private readonly recipeService: RecipeService) {
    this.recipes = this.recipeService.recipes;

    // optional: auto-load once
    this.recipeService.listRecipes();
  }

}
