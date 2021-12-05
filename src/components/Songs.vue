<script setup>
import Song from "./Song.vue";

const songs = await fetch("/.netlify/functions/getvideos").then(res => res.json());
</script>
<template>
    <div class="flex flex-col items-center px-1 sm:px-10">
        <!-- <p>{{ songs.length }} songs</p> -->
        <Song v-for="song in songs" :song="song" />
    </div>
</template>
