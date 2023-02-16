<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Character } from "../interfaces/character";
import characterStore from "../../store/characters.store";
import api from "@/api/api";
import { useQuery } from "@tanstack/vue-query";

const route = useRoute();
const { id } = route.params as { id: string };

const getCharacterCacheFirst = async (
  CharacterId: string
): Promise<Character> => {
  if (characterStore.checkIdInStore(CharacterId)) {
    return characterStore.ids.list[CharacterId];
  }

  const { data } = await api.get(`/character/${CharacterId}`);
  return data;
};

const { data } = useQuery(
  [`character/${id}`],
  () => getCharacterCacheFirst(id),
  {
    onSuccess(character) {
      characterStore.loadedCharacter(character);
    },
  }
);
</script>

<template>
  <h1 v-if="!data">Loading...</h1>
  <div v-else>
    <h1>{{ data.name }}</h1>
    <div class="character-container">
      <img :src="data.image" :alt="data.name" />>
      <ul>
        <li>Sexo: {{ data.gender }}</li>
        <li>Origen: {{ data.origin.name }}</li>
        <li>Estado: {{ data.status }}</li>
        <li>Raza: {{ data.species }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
}
img {
  width: 150px;
  border-radius: 5;
}
</style>
