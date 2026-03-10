<script setup lang="ts">
import {useRecipeStore} from "@/stores/recipe.ts";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiSilverwareForkKnife } from '@mdi/js';

const recipeStore = useRecipeStore();
const { recipes } = storeToRefs(recipeStore);

onMounted(async () => {
  await recipeStore.getRecipes()
})
</script>

<!--<template>-->
<!--  <v-container class="fill-height d-flex justify-center align-center">-->
<!--    <div class="text-center">-->
<!--      <h1>Recipes</h1>-->
<!--     <v-list>-->
<!--       <v-list-item-->
<!--         v-for="recipe in recipes"-->
<!--         :key="recipe.id">-->
<!--         {{recipe.title}}-->
<!--       </v-list-item>-->
<!--     </v-list>-->
<!--    </div>-->
<!--  </v-container>-->
<!--</template>-->

<template>
  <v-container class="fill-height">
    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold">Recipes</h1>
    </div>

    <v-row justify="center">
      <v-col
        v-for="recipe in recipes"
        :key="recipe.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto" elevation="2">
          <div class="d-flex justify-space-between align-start pa-4">
            <div>
              <v-card-title class="pa-0 text-h5 font-weight-bold">
                {{ recipe.title }}
              </v-card-title>
              <div class="text-subtitle-2 text-grey">
                 {{ recipe.difficulty.toLowerCase() }}
              </div>
            </div>

            <svg-icon
              type="mdi"
              :path="mdiSilverwareForkKnife"
              size="48"
              class="text-green-lighten-4 opacity-70"
            ></svg-icon>
          </div>

          <v-card-text class="pt-0">
            {{ recipe.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn color="success" variant="text">View Recipe</v-btn>
          </v-card-actions>
        </v-card>
<!--        <v-card class="mx-auto" elevation="2">-->
<!--          <svg-icon-->
<!--            type="mdi"-->
<!--            :path="mdiSilverwareForkKnife"-->
<!--            size="100"-->
<!--            class="text-green-lighten-4 opacity-70"-->
<!--          ></svg-icon>-->

<!--          <v-card-title>{{ recipe.title }}</v-card-title>-->

<!--          <v-card-text>-->
<!--            <div class="text-subtitle-1">-->
<!--              • {{ recipe.difficulty }}-->
<!--            </div>-->
<!--            <div>{{ recipe.description }}</div>-->
<!--          </v-card-text>-->

<!--          <v-card-actions>-->
<!--            <v-btn color="success" variant="text">-->
<!--              View Recipe-->
<!--            </v-btn>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
      </v-col>
    </v-row>
  </v-container>
</template>
