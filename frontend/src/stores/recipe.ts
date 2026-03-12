import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Recipe {
  id: string
  title: string
  description: string
  difficulty: string
  category: string
  ingredients: string[]
}

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([])

  async function getRecipes(): Promise<Recipe[]> {
    const response = await fetch('http://localhost:8080/api/v1/recipes', {
      headers: {
        'X-API-KEY': 'dingding',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recipes')
    }

    const data: Recipe[] = await response.json()
    recipes.value = data
    return data
  }

  function getRecipe(id: string) {
    return recipes.value.find((r) => r.id === id)
  }

  return { recipes, getRecipes, getRecipe }
})
