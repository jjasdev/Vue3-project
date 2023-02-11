import AboutPage from "@/shared/pages/AboutPage.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { characterRoute } from "../characters/router/index";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public
    { path: "/", name: "home", component: HomePage },
    { path: "/about", name: "about", component: AboutPage },

    // Characters
    // {
    //   path: "/characters",
    //   name: "characters",
    //   component: () => import("@/characters/layouts/CharacterLayout.vue"),
    // },
    {
      ...characterRoute,
      path: "/characters",
    },

    // Default
    // path: "/characters",
    { path: "/:pathMatch(.*)*", redirect: () => ({ name: "home" }) },
  ],
});

// Characters
// router.addRoute(characterRoute);

export default router;
