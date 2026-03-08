import {Routes} from '@angular/router';
import {RecipeList} from './recipes/recipe-list/recipe-list';
import {RecipeDetail} from './recipes/recipe-detail/recipe-detail';
import {Home} from './home/home';
import {RecipeCreate} from './recipes/recipe-create/recipe-create';

export const routes: Routes = [
  {path: '', component: Home, title: 'Welcome Home'},
  {path: 'recipes', component: RecipeList, title: 'All Recipes'},
  {path: 'recipes/new', component: RecipeCreate, title: 'Recipe Creation'},
  {path: 'recipes/:id', component: RecipeDetail, title: 'Recipe Detail'},
];
