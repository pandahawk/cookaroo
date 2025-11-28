import { Routes } from '@angular/router';
import {RecipeList} from './recipes/recipe-list/recipe-list';
import {RecipeDetail} from './recipes/recipe-detail/recipe-detail';
import {Home} from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Welcome Home'
  },
  {
    path: 'recipes',
    component: RecipeList,
    title: 'All Recipes'
  },
  {
    path: 'recipes/:id',
    component: RecipeDetail,
    title: 'Recipe Detail'
  }

  // { path: '', redirectTo: 'recipe-list', pathMatch: 'full' },
  // { path: 'recipe-list', component: RecipeList },
  // {path: 'recipe-list/:id', component: RecipeDetail}
];
