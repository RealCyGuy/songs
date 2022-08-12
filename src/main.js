import { createApp } from "vue/dist/vue.esm-bundler";
import { createRouter, createWebHistory } from "vue-router";

import "./styles.css";

import App from "./App.vue";
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
