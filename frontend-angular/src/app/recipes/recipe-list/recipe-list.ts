import {Component, inject, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';
import {MatButton} from '@angular/material/button';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCardActions,
    MatCardSubtitle
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList implements OnInit {

  readonly recipeService = inject(RecipeService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.recipeService.loadRecipeList();
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
