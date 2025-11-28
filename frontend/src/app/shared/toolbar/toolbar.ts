import {Component,} from '@angular/core';
import {RecipeService} from '../../recipes/recipe.service';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,) {
  }

  load() {
    this.recipeService.loadRecipeList();
    this.router.navigate(['/recipes']);
  }

  get loading(): boolean {
    return this.recipeService.loading();   // call the signal here
  }

  goHome() {
    this.router.navigate(['/']);
    this.recipeService.goHome();
  }

}
