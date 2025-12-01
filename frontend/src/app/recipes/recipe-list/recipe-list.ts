import {Component, OnInit} from '@angular/core';
import {Recipe, RecipeService} from '../recipe.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle
} from '@angular/material/card';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-recipe-list',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCardActions
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList implements OnInit {

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
        this.recipeService.loadRecipeList();
    }

  get recipes() {
    return this.recipeService.recipes();
  }

  deleteRecipe(r: Recipe) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '360px',
      data: {
        title: 'Rezept löschen',
        message: `Möchtest du "${r.title}" wirklich löschen?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.recipeService.deleteRecipe(r.id);
      }
    });
  }

  onRecipeClick(r: Recipe) {
    console.log("Card clicked:", r.title);
    this.router.navigate(['/recipes', r.id]);
  }
}
