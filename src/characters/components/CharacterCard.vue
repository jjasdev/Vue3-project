<script setup lang="ts">
import { toRef } from "vue";
import { useRouter } from "vue-router";
import type { Character } from "../interfaces/character";

interface Props {
  character: Character;
}
const props = defineProps<Props>();
const character = toRef(props, "character");
const router = useRouter();

const goTo = () => {
  router.push(`by/${character.value.id}`);
};
</script>
<template>
  <div class="character-card" @click="goTo">
    <!-- <img
      src="https://www.lciacademy.com/wp-content/uploads/2017/09/default-avatar.png"
      alt="No image" /> -->
    <img :src="props.character.image" :alt="props.character.name" />
    <h3>{{ props.character.name }}</h3>
  </div>
</template>

<style scoped>
.character-card {
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  flex-grow: 1;
  cursor: pointer;
}
img {
  height: 300px;
  object-fit: cover;
  width: 150px;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}
img:hover {
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
  transition: all 0.5s;
}
</style>
