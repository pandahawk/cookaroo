<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)

const categoryIcons: Record<string, string> = {
  FISH: 'mdi-fish',
  PORK: 'mdi-pig-variant',
  BEEF: 'mdi-cow',
  CHICKEN: 'mdi-turkey',
}

const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || 'mdi-sprout-outline'
}

onMounted(async () => {
  await recipeStore.getRecipes()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4">
        <v-card variant="elevated" class="recipe-card">
          <v-card-item>
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

            <v-card-subtitle class="d-flex justify-space-between">
              <span>
                {{ recipe.difficulty.toLowerCase() }}
              </span>
            </v-card-subtitle>

            <v-card-text>{{ recipe.description }}</v-card-text>

            <v-card-actions class="justify-end pa-2">
              <v-btn
                icon="mdi-magnify"
                variant="plain"
                color="green"
                :to="{ name: 'detail', params: { id: recipe.id } }"
              ></v-btn>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.recipe-card {
  background-color: rgba(255, 255, 255, 1) !important; /* 70% white */
  backdrop-filter: blur(10px); /* The magic ingredient */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Soft edge */
}
</style>
