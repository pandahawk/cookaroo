<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/recipe.ts'
import { computed, onMounted } from 'vue'

const route = useRoute()
const store = useRecipeStore()
const recipeId = route.params.id as string
const recipe = computed(() => store.getRecipe(recipeId))

const categoryIcons: Record<string, string> = {
  FISH: 'mdi-fish',
  PORK: 'mdi-pig-variant',
  BEEF: 'mdi-cow',
  CHICKEN: 'mdi-turkey',
}

const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || 'mdi-sprout-outline'
}

onMounted(() => {
  if (store.recipes.length === 0) {
    store.getRecipes()
  }
})
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card v-if="store.recipes.length === 0" class="pa-5 text-center">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
      <div class="mt-2">Loading...</div>
    </v-card>

    <v-card v-if="recipe">
      <v-card-title>
        <div class="d-flex justify-space-between align-center mb-2">
          <h2
            class="text-h2 text-truncate font-weight-bold text-green-darken-3"
            style="min-width: 0; line-height: 1.2"
          >
            {{ recipe.title }}
          </h2>
          <span>
            <v-icon
              :icon="getCategoryIcon(recipe.category)"
              size="x-large"
              color="grey-lighten-1"
            ></v-icon>
          </span>
        </div>
      </v-card-title>
      <v-card-subtitle class="d-flex justify-space-between">
        <span>
          {{ recipe.difficulty.toLowerCase() }}
        </span>
      </v-card-subtitle>
      <v-card-text>{{ recipe.description }}</v-card-text>
      <v-card-text>
        <div class="text-h6 mb-2">Ingredients:</div>
        <v-list density="compact">
          <v-list-item
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            prepend-icon="mdi-circle-small"
          >
            <v-list-item-title>{{ ingredient }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>
