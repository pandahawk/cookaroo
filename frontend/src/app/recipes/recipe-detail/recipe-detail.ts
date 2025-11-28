import {Component, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Recipe, RecipeService} from '../recipe.service';
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
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit  {
  recipe: Signal<Recipe | null> = signal<Recipe | null>(null);

  constructor(
    private readonly recipeService: RecipeService,
    private readonly route: ActivatedRoute) { }



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipe = this.recipeService.selectedRecipe;
    if (id) {
      this.recipeService.loadRecipeById(id);
    }
  }

  goBack() {
    globalThis.history.back();
  }

}
