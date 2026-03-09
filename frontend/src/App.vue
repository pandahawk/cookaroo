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
