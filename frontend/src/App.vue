<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
.v-main {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/kitchen.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* This keeps the image still while you scroll */
  min-height: 100vh;
}
</style>
