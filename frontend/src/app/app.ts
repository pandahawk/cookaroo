import {Component, signal} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Recipe, RecipeService} from './recipe.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatToolbar, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  recipes = signal<Recipe[]>([]);

  constructor(private readonly recipeService: RecipeService) {
  }

  protected readonly title = signal('frontend');

  loadRecipeSummaries() {
    this.recipeService.listRecipes()
      .subscribe(recipe => {
        this.recipes.set(recipe);
        console.log('Loaded recipes: ', recipe);
      });
  }
}
