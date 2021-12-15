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
                class="rounded-full px-5 w-1/2 outline-none from-[#7147b4] to-[#2a2cc4] bg-gradient-to-r text-white placeholder-gray-300"
                placeholder="Search..."
                @keyup="typing($event.target.value)"
            />
            <a
                class="py-2 px-5 text-white bg-[#6600E8] rounded-lg"
                href="https://gist.github.com/RealCyGuy/43291c70392ca6ee335a6871175a54c8"
            >Download</a>
        </div>
        <div class="w-full mb-5 p-3">
            <p class="text-[#c7ddf5] w-full"><span class="text-white">{{ data.items.length }}</span> songs (<span class="text-white">{{ filtered.length }}</span> results)</p>
            <p
                class="text-[#c7ddf5] w-full"
            ><span class="text-white">{{ hours }}</span> hours, <span class="text-white">{{ minutes }}</span> minutes, <span class="text-white">{{ seconds }}</span> seconds total time</p>
            <p class="text-[#c7ddf5] w-full">or <span class="text-white">{{ (duration / 864.00).toFixed(4) }}%</span> of a day,</p>
            <p class="text-[#c7ddf5] w-full">which is <span class="text-white">{{ (duration / 6048.00).toFixed(4) }}%</span> of a week,</p>
            <p class="text-[#c7ddf5] w-full">and <span class="text-white">{{ (duration / 315569.52).toFixed(4) }}%</span> of a year!</p>
        </div>
        <Song v-for="song in filtered" :song="song" :key="song.id" />
    </div>
</template>
