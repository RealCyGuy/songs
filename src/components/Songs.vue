<script setup>
import Song from "./Song.vue";

const data = await fetch("/.netlify/functions/getdb").then(res => res.json());
console.log(data);
</script>
<template>
    <div class="flex flex-col items-center px-1 sm:px-10">
        <!-- <p>{{ songs.length }} songs</p> -->
        <Song v-for="song in data.items" :song="song" />
    </div>
</template>
