import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipes/recipe.service';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatButton,
    MatCard,
    NgClass
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit  {

  private readonly route =  inject(ActivatedRoute);
  private readonly recipeService=  inject(RecipeService);

  recipe = this.recipeService.selectedRecipe;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.loadRecipe(id);
    }
  }

  goBack() {
    globalThis.history.back();
  }

}
