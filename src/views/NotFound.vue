<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="p-10 pt-15">
    <h1 class="text-5xl font-semibold mb-3">Page not found!</h1>
    <h2 class="text-2xl">Click <RouterLink to="/" class="underline hover:text-gray-200 duration-150">here</RouterLink> to go home.</h2>
  </div>
</template>
