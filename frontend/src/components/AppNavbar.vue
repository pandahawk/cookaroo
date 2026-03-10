<script setup lang="ts">
</script>

<template>
  <v-app-bar
    color="rgba(255, 255, 255, 0.8)"
    flat
    class="glass-effect"
  >
    <v-app-bar-title class="font-weight-bold text-green-darken-3">
      <v-icon icon="mdi-silverware-fork-knife" start/>
      Cookaroo
    </v-app-bar-title>

    <v-spacer />
    <template v-slot:extension>
      <div class="d-flex justify-center w-100 pb-2">
        <v-btn to="/" variant="text">
          <v-icon icon="mdi-home" start></v-icon>
          Home
        </v-btn>

        <v-btn to="/recipes" variant="text" class="mx-2">
          <v-icon icon="mdi-format-list-bulleted" start></v-icon>
          Recipes
        </v-btn>

        <v-btn to="/create" variant="text">
          <v-icon icon="mdi-plus-circle-outline" start></v-icon>
          Create
        </v-btn>
      </div>
    </template>
<!--    <v-btn to="/" color="text-green-darken-3">-->
<!--      <v-icon icon="mdi-home" start/>-->
<!--      <span class="hidden-sm-and-down">Home</span>-->
<!--    </v-btn>-->

<!--    <v-btn to="/recipes" color="text-green-darken-3">-->
<!--      <v-icon icon="mdi-format-list-bulleted" start/>-->
<!--      <span class="hidden-sm-and-down">Recipes</span>-->
<!--    </v-btn>-->

<!--    <v-btn to="/create" color="text-green-darken-3">-->
<!--      <v-icon icon="mdi-plus-circle-outline" start/>-->
<!--      <span class="hidden-sm-and-down">Create</span>-->
<!--    </v-btn>-->

  </v-app-bar>
</template>

<style scoped>
/* 3. This adds the blurry "frosted glass" feel */
.glass-effect {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>


