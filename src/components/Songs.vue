<script setup>
import Song from "./Song.vue";
import { computed, ref } from "vue";

var search = ref("");
var timer;

const data = await fetch("/.netlify/functions/getdb").then(res => res.json());
console.log(data);
const duration = parseInt(data.duration);
var seconds = duration;
var hours = Math.floor(seconds / 3600);
var minutes = Math.floor((seconds - (hours * 3600)) / 60);
seconds = seconds - (hours * 3600) - (minutes * 60);

var filtered = computed(() => {
    return data.items.filter(song => {
        return song.title.toLowerCase().includes(search.value);
    });
});

function typing(value) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        search.value = value.toLowerCase();
    }, 200);
}
</script>

<template>
    <div class="flex flex-col items-center px-3 sm:px-10 max-w-2xl w-full mx-auto">
        <div class="flex justify-between w-full mb-5">
            <input
                type="text"
                class="rounded-full px-5 w-1/2 shadow-lg outline-none focus:ring-4 ring-offset-2 ring-offset-[#8A8A8A] ring-[#6b6b6b]"
                placeholder="Search..."
                @keyup="typing($event.target.value)"
            />
            <a
                class="py-2 px-5 text-white from-[#6600E8] to-[#7102C8] bg-gradient-to-br rounded-lg shadow-lg"
                href="https://gist.github.com/RealCyGuy/43291c70392ca6ee335a6871175a54c8"
            >Download</a>
        </div>
        <div class="w-full mb-5 shadow-lg bg-[#a9a9a9] p-3">
            <p class="text-white w-full">{{ data.items.length }} songs ({{ filtered.length }} results)</p>
            <p
                class="text-white w-full"
            >{{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds total time</p>
            <p class="text-white w-full">or {{ (duration / 864.00).toFixed(4) }}% of a day,</p>
            <p class="text-white w-full">which is {{ (duration / 6048.00).toFixed(4) }}% of a week,</p>
            <p class="text-white w-full">and {{ (duration / 315569.52).toFixed(4) }}% of a year!</p>
        </div>
        <Song v-for="song in filtered" :song="song" :key="song.id" />
    </div>
</template>
