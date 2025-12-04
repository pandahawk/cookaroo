import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe, RecipeService} from '../recipe.service';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions,} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/list';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatButton,
    MatIcon,
    MatCard,
    MatDivider,
    MatCardActions
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit  {

  readonly recipeService = inject(RecipeService);
  readonly route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.loadRecipeById(id);
    }
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
        this.router.navigate(['/recipes']);
      }
    });
  }

  goBack() {
    globalThis.history.back();
  }
}
