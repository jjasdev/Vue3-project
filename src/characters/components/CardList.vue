<script setup lang="ts">
// import { ref } from "vue";
// import api from "@/api/api";
import type { Character } from "@/characters/interfaces/character";
// import { useCharacters } from "../composables/useCharacters";

import api from "@/api/api";
import { useQuery } from "@tanstack/vue-query";
import CharacterCard from "./CharacterCard.vue";

// 2- Suspense
// const { data } = await api.get("/character");
// const characters = ref<Character[]>(data.results);

// 2- Composable functions
// const { characters, isLoading, hasError, errorMessage } = useCharacters();

// 3- Vue-query
const getCharactersSlow = async (): Promise<Character[]> => {
  const { data } = await api.get("/character");
  const results: Character[] = data.results;
  return results;
};
const { isLoading, data: characters } = useQuery(
  ["characters"],
  getCharactersSlow,
  { cacheTime: 1000 * 60 }
);
</script>
<template>
  <h1 v-if="isLoading">Loading...</h1>
  <div class="card-list">
    <CharacterCard
      v-for="character of characters"
      :key="character.id"
      :character="character" />
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
