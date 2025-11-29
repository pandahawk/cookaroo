import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions,} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/list';

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

  constructor(
    private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute) { }



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.loadRecipeById(id);
    }
  }

  goBack() {
    globalThis.history.back();
  }

  get recipe() {
    return this.recipeService.selectedRecipe;
  }

}
