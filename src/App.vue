<script setup>
import Songs from './components/Songs.vue';
</script>

<template>
  <div class="min-h-screen bg-[#8A8A8A]">
    <div class="py-14 flex flex-col items-center">
      <h1 class="text-white font-serif text-5xl">songs</h1>
      <h2 class="text-white italic text-3xl font-light my-1">the best music playlist</h2>
      <h3 class="text-white font-cursive text-lg">
        <a href="https://www.youtube.com/playlist?list=PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A">youtube</a> -
        <a href="https://github.com/realcyguy/songs">github</a> -
        <a href="https://realcyguy.netlify.app">cyrus yip</a>
      </h3>
    </div>
    <suspense>
      <template #default>
        <Songs />
      </template>
      <template #fallback>
        <h3 class="text-white">loading...</h3>
      </template>
    </suspense>
  </div>
</template>
