<script setup>
import VLazyImage from "v-lazy-image";

defineProps({
    song: Object
});
</script>

<template>
    <div class="mb-3 p-3 sm:p-5 bg-[#C4C4C4] rounded-lg w-full shadow-2xl flex flex-row">
        <a
            :href="'https://www.youtube.com/watch?v=' + song.id + '&list=PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A'"
            class="w-[120px] h-[67px] sm:w-[180px] sm:h-[100px] mr-5 flex-none my-2 sm:my-0 relative"
        >
            <VLazyImage
                :src="song.thumbnail"
                src-placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0/A8AAYcBQqKIKZoAAAAASUVORK5CYII="
                class="object-cover w-full h-full rounded shadow-2xl"
            />
            <p class="absolute right-1 bottom-1 bg-gray-400 w-10 text-center text-sm text-white rounded shadow-xl">{{ song.duration }}</p>
        </a>
        <div class="flex flex-col justify-between">
            <a
                :href="'https://www.youtube.com/watch?v=' + song.id + '&list=PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A'"
                class="text-white text-xs sm:text-base"
            >{{ song.title }}</a>
            <a
                :href="'https://www.youtube.com/channel/' + song.channelId"
                class="text-white text-xs sm:text-base"
            >{{ song.channel }}</a>
        </div>
    </div>
</template>