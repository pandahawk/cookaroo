import {Component,} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RecipeService} from '../../recipes/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatButton,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,) {
  }

  load() {
    this.router.navigate(['/recipes']);
    this.recipeService.loadRecipes();
  }
  get loading(): boolean {
    return this.recipeService.loading();   // call the signal here
  }

  goHome() {
    this.router.navigate(['/recipes']);
    this.recipeService.goHome();
  }

}
