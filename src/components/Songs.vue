<script setup>
import Song from "./Song.vue";
import { computed, ref } from "vue";
import store from "../getdb.js";

const format = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
});

const search = ref("");
var timer;

const data = await store();
const duration = parseInt(data.duration);
var seconds = duration;
var hours = Math.floor(seconds / 3600);
var minutes = Math.floor((seconds - (hours * 3600)) / 60);
seconds = seconds - (hours * 3600) - (minutes * 60);

var filtered = computed(() => {
    return data.items.filter(song => {
        return song.title.toLowerCase().includes(search.value) || song.channel.toLowerCase().includes(search.value);
    });
});

function typing(value) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        search.value = value.toLowerCase();
    }, 200);
}

const selected = ref("Date added");
const ascending = ref("Ascending");

function sorted(items) {
    items = [...items];
    switch (selected.value) {
        // "Date added" is assumed to be sorted by YouTube.
        case "Date created":
            items.sort((a, b) => {
                return a.publishedDate - b.publishedDate;
            });
            break;
        case "Title":
            items.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
            break;
        case "Channel":
            items.sort((a, b) => {
                return a.channel.localeCompare(b.channel);
            });
            break;
        case "Views":
            items.sort((a, b) => {
                return a.rawViews - b.rawViews;
            });
            break;
        case "Likes":
            items.sort((a, b) => {
                return a.rawLikes - b.rawLikes;
            });
            break;
        case "Random":
            let currentIndex = items.length, randomIndex;

            while (currentIndex != 0) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                [items[currentIndex], items[randomIndex]] = [
                    items[randomIndex], items[currentIndex]];
            }
            return items;
    }
    if (ascending.value == "Ascending") {
        return items;
    } else {
        return items.reverse();
    }
}
</script>

<template>
    <div class="flex flex-col items-center px-3 sm:px-10 max-w-2xl w-full mx-auto">
        <div class="flex justify-between w-full mb-5">
            <input type="text"
                class="rounded-full px-5 w-1/2 outline-none from-[#7147b4] to-[#2a2cc4] bg-gradient-to-r placeholder-gray-300 focus:from-[#9664e7] focus:to-[#5154e7] hover:from-[#8154c9] hover:to-[#2124da]"
                placeholder="Search..." @keyup="typing($event.target.value)" />
            <a class="py-2 px-5 bg-[#6600E8] rounded-lg hover:bg-white hover:text-black hover:rounded-none duration-500"
                href="https://gist.github.com/RealCyGuy/43291c70392ca6ee335a6871175a54c8">Download</a>
        </div>
        <div class="w-full p-3">
            <p class="text-[#c7ddf5] w-full"><span class="text-white">{{ data.items.length }}</span> songs (<span
                    class="text-white">{{ filtered.length }}</span> results)</p>
            <p class="text-[#c7ddf5] w-full"><span class="text-white">{{ hours }}</span> hours, <span
                    class="text-white">{{ minutes }}</span> minutes, <span class="text-white">{{ seconds }}</span>
                seconds total time</p>
            <p class="text-[#c7ddf5] w-full">or <span class="text-white">{{ (duration / 864.00).toFixed(4) }}%</span> of
                a day,</p>
            <p class="text-[#c7ddf5] w-full">which is <span class="text-white">{{ (duration / 6048.00).toFixed(4)
            }}%</span> of a week,</p>
            <p class="text-[#c7ddf5] w-full">and <span class="text-white">{{ (duration / 315569.52).toFixed(4)
            }}%</span> of a year!</p>
        </div>
        <div class="w-full mb-5">
            <label for="sort" class="mr-2">Sort by:</label>
            <div class="inline-block bg-purple-800 from-[#7147b4] to-[#2a2cc4] bg-gradient-to-r rounded-md">
                <div
                    class="inline-block relative after:content-['▼'] after:absolute after:right-1 after:bottom-2 after:z-0">
                    <select name="sort" v-model="selected"
                        class="relative z-10 pl-3 pr-7 py-2 appearance-none bg-transparent">
                        <option class="bg-purple-800">Date added</option>
                        <option class="bg-purple-800">Date created</option>
                        <option class="bg-purple-800">Title</option>
                        <option class="bg-purple-800">Channel</option>
                        <option class="bg-purple-800">Views</option>
                        <option class="bg-purple-800">Likes</option>
                        <option class="bg-purple-800">Random</option>
                    </select>
                </div>
                <div
                    class="inline-block relative after:content-['▼'] after:absolute after:right-2 after:bottom-2 after:z-0">
                    <select v-model="ascending"
                        class="relative z-10 pl-3 pr-8 py-2 appearance-none bg-transparent">
                        <option class="bg-purple-800">Ascending</option>
                        <option class="bg-purple-800">Descending</option>
                    </select>
                </div>
            </div>
        </div>
        <Song v-for="song in sorted(filtered)" :song="song" :key="song.id" :format="format" />
    </div>
</template>
