<script setup lang="ts">
import {useRecipeStore} from "@/stores/recipe.ts";

const recipeStore = useRecipeStore();
const recipes = recipeStore.getRecipes()
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <div class="text-center">
      <h1>Recipes</h1>
     <v-list>
       <v-list-item
         v-for="recipe in recipes"
         :key="recipe.id">
         {{recipe.title}}
       </v-list-item>
     </v-list>
    </div>
  </v-container>
</template>
