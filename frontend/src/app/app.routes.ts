import { Routes } from '@angular/router';
import {Recipes} from './recipes/recipes';
import {RecipeDetail} from './recipe-detail/recipe-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: Recipes },
  {path: 'recipes/:id', component: RecipeDetail}
];
