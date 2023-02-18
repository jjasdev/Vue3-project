<script setup lang="ts">
import { watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import useCharacter from "../composables/useCharacter";

const router = useRouter();
const route = useRoute();
const { id } = route.params as { id: string };
const { hasError, errorMessage, character, isLoading } = useCharacter(id);

watchEffect(() => {
  if (!isLoading.value && hasError.value) {
    router.replace("/characters");
  }
});
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <h1 v-else-if="hasError">{{ errorMessage }}</h1>
  <div v-else-if="character">
    <h1>{{ character.name }}</h1>
    <div class="character-container">
      <img :src="character.image" :alt="character.name" />>
      <ul>
        <li>Sexo: {{ character.gender }}</li>
        <li>Origen: {{ character.origin.name }}</li>
        <li>Estado: {{ character.status }}</li>
        <li>Raza: {{ character.species }}</li>
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
