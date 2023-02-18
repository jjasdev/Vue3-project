import api from "@/api/api";
import axios from "axios";
import { onMounted, ref } from "vue";
import type { Character } from "../interfaces/character";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>("");

export const useCharactersOld = () => {
  onMounted(() => {
    loadCharacters();
  });

  const loadCharacters = async () => {
    // Llamar una única vez a la api
    if (characters.value.length > 0) return;
    isLoading.value = true;
    try {
      const { data } = await api.get("/character");
      characters.value = data.results;
      isLoading.value = false;
    } catch (error) {
      hasError.value = true;
      isLoading.value = false;
      if (axios.isAxiosError(error)) {
        return (errorMessage.value = error.message);
      }
      errorMessage.value = JSON.stringify(error);
    }
  };

  return { characters, isLoading, hasError, errorMessage };
};
