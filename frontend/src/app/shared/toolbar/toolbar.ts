import {Component, inject,} from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Router} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton,} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  readonly recipeService = inject(RecipeService);
  readonly router = inject(Router);

  onRecipesClick() {
    this.recipeService.loadRecipeList();
    this.router.navigate(['/recipes']);
  }

  onHomeClick() {
    this.recipeService.goHome();
    this.router.navigate(['/']);
  }
}
