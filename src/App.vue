<script setup>
import Songs from './components/Songs.vue';
import { reactive, ref } from "vue";

const backgroundPosition = ref("50% 0%")
const style = reactive({ backgroundPosition });

window.onscroll = function () {
  window.requestAnimationFrame(() => {
    backgroundPosition.value = "50% " + ((window.innerHeight - window.scrollY) * 0.5) + "px";
  });
  console.log(backgroundPosition.value);
};

window.onscroll();
</script>

<template>
  <div class="main min-h-screen from-[#212672] to-[#571a8a] bg-repeat bg-fixed backdrop-blur-xl" :style="style">
    <div class="pt-14 mb-7 flex flex-col items-center">
      <h1 class="text-white font-serif text-5xl">songs</h1>
      <h2 class="text-white italic text-3xl font-light my-1">the best music playlist</h2>
      <h3 class="text-white font-cursive text-xl">
        <a
          class="hover:text-gray-200"
          href="https://www.youtube.com/playlist?list=PLRct1-5In-8Ewg5Kq-0JP8wh3ZweOXH9A"
        >youtube</a> -
        <a class="hover:text-gray-200" href="https://github.com/realcyguy/songs">github</a> -
        <a class="hover:text-gray-200" href="https://realcyguy.netlify.app">cyrus yip</a>
      </h3>
    </div>
    <suspense>
      <template #default>
        <Songs />
      </template>
      <template #fallback>
        <div>
          <h3 class="text-white text-center">Loading the epic songs...</h3>
          <div class="spinner mx-auto mt-10">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </div>
      </template>
    </suspense>
  </div>
</template>

<style>
.main {
  background-image: url("assets/bg.svg");
}

.spinner {
  width: 40px;
  height: 40px;

  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(164, 166, 255);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
