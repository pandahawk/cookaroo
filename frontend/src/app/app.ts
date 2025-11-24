import {Component, signal} from '@angular/core';
import {Recipe, RecipeService} from './recipes/recipe.service';
import {Toolbar} from './shared/toolbar/toolbar';
import {Recipes} from './recipes/recipes';

@Component({
  selector: 'app-root',
  imports: [ Toolbar, Recipes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  recipes = signal<Recipe[]>([]);

  constructor(private readonly recipeService: RecipeService) {
  }

  protected readonly title = signal('frontend');


  createRecipe() {
    console.log('Creating recipe...');
  }
}
