import { ref, computed } from "vue";
import api from "@/api/api";
import { useQuery } from "@tanstack/vue-query";
import type { Character } from "../interfaces/character";

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) {
    return characterSet.value[id];
  }
  try {
    const { data } = await api.get(`/character/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;

  characterSet.value[character.id] = character;
};

const loadedWithError = (error: string) => {
  hasError.value = true;
  errorMessage.value = error;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery([`character/${id}`], () => getCharacter(id), {
    onSuccess(character) {
      loadedCharacter(character);
    },
    onError(error: string) {
      loadedWithError(error);
    },
  });

  return {
    // Properties
    list: characterSet,
    hasError,
    errorMessage,
    isLoading,

    // Getters
    character: computed<Character | null>(() => characterSet.value[id]),

    // Methods
  };
};

export default useCharacter;
