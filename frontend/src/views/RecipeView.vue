<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)

onMounted(async () => {
  await recipeStore.getRecipes()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4">
        <v-card variant="elevated">
          <v-img src="/kitchen.jpg" height="180px" cover> </v-img>
          <v-card-item>
            <div class="d-flex justify-space-between align-start mb-2">
              <span
                class="text-h5 text-truncate font-weight-bold text-green-darken-3"
                style="min-width: 0; line-height: 1.2"
              >
                {{ recipe.title }}
              </span>
            </div>

            <v-card-subtitle class="d-flex justify-space-between">
              <span>
                {{ recipe.difficulty.toLowerCase() }}
              </span>
              <span>
                {{ recipe.category.map((cat) => cat.toLowerCase()).join(', ') }}
              </span>
            </v-card-subtitle>

            <v-card-text>{{ recipe.description }}</v-card-text>

            <v-card-actions class="justify-end pa-2">
              <v-btn icon="mdi-magnify" variant="plain" color="green"></v-btn>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
