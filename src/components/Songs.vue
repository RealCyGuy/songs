<script setup>
import Song from "./Song.vue";

const data = await fetch("/.netlify/functions/getdb").then(res => res.json());
console.log(data);
const duration = parseInt(data.duration);
var seconds = duration;
var hours = Math.floor(seconds / 3600);
var minutes = Math.floor((seconds - (hours * 3600)) / 60);
seconds = seconds - (hours * 3600) - (minutes * 60);
</script>

<template>
    <div class="flex flex-col items-center px-1 sm:px-10">
        <div class="max-w-2xl w-full mb-7">
            <p class="text-white w-full">{{ data.items.length }} songs</p>
            <p
                class="text-white w-full"
            >{{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds total time</p>
            <p class="text-white w-full">or {{ (duration / 864.00).toFixed(4) }}% of a day,</p>
            <p class="text-white w-full">which is {{ (duration / 6048.00).toFixed(4) }}% of a week,</p>
            <p class="text-white w-full">and {{ (duration / 315569.52).toFixed(4) }}% of a year!</p>
        </div>
        <Song v-for="song in data.items" :song="song" />
    </div>
</template>
