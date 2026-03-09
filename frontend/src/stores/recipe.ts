import {defineStore} from "pinia";
import {ref} from "vue";

export interface Recipe {
  id: string
  title: string
}

export const useRecipeStore = defineStore('recipes', () => {

  const recipes = ref<Recipe[]>([
    {id: '1', title: 'Spaghetti Bolognese'},
    {id: '2', title: 'Pancakes'},
    {id: '3', title: 'Caesar Salad'},
  ]);

  function getRecipes(): Recipe[] {
    return recipes.value;
  }

  function getRecipe(id: string) {
    return recipes.value.find(r => r.id === id)
  }

  return {getRecipes, getRecipe}

});
