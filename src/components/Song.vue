<script setup>
import VLazyImage from "v-lazy-image";

defineProps({
    song: Object,
});
</script>

<template>
    <div class="mb-3 p-3 sm:p-5 rounded-lg w-full flex flex-col bg-white bg-opacity-20 bg-clip-padding backdrop-blur-lg hover:bg-opacity-30 duration-500">
        <div class="flex flex-row">
            <a
                :href="'https://www.youtube.com/watch?v=' + song.id + '&list=PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A'"
                class="w-[120px] h-[67px] sm:w-[180px] sm:h-[100px] mr-5 flex-none my-2 sm:my-0 relative"
            >
                <VLazyImage
                    :src="song.thumbnail"
                    src-placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0/A8AAYcBQqKIKZoAAAAASUVORK5CYII="
                    class="object-cover w-full h-full rounded hover:opacity-80 duration-500"
                />
                <p class="absolute right-1 bottom-1 bg-gray-400 w-10 text-center text-sm text-white rounded shadow-xl">{{ song.duration }}</p>
            </a>
            <div class="flex flex-col justify-between items-start">
                <a
                    :href="'https://www.youtube.com/watch?v=' + song.id + '&list=PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A'"
                    class="text-white text-xs sm:text-base hover:text-blue-200 duration-500"
                >{{ song.title }}</a>
                <a
                    :href="'https://www.youtube.com/channel/' + song.channelId"
                    class="text-white text-xs sm:text-base hover:text-blue-200 duration-500"
                >{{ song.channel }}</a>
            </div>
        </div>
        <div class="mt-2">
            <p class="text-white">{{ song.formattedViews }} views · {{ song.formattedLikes }} likes</p>
            <p class="text-white">Published {{ song.formattedPublishedDate }} · Added {{ song.formattedAddedDate }}</p>
        </div>
    </div>
</template>