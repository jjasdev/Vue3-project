<script setup lang="ts">
import NavBarVue from "@/shared/components/NavBar.vue";
import { RouterView } from "vue-router";
import type { RouterLink } from "@/router/link-routes";
import { characterRoute } from "../router/index";

const routeLink: RouterLink[] = characterRoute
  .children!.filter((route) => (route.props as { visible: boolean }).visible)
  .map((route) => {
    return {
      name: route.name as string,
      path: route.path,
      title: (route.props as { title: string; visible: boolean }).title,
    };
  });
</script>

<template>
  <div>
    <h1>Personajes</h1>
    <!-- NavBar -->
    <NavBarVue :show-icon="false" :links="routeLink" />
    <!-- Router View + Suspense -->
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>

<style scoped></style>
