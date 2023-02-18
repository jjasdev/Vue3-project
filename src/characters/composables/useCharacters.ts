import { ref, computed } from "vue";
import api from "@/api/api";
import { useQuery } from "@tanstack/vue-query";
import type { Character } from "../interfaces/character";
const characters = ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length > 0) {
    return characters.value;
  }
  const { data } = await api.get("/character");
  return data.results;
};

const loadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data;
};

const useCharacters = () => {
  const { isLoading } = useQuery(["characters"], getCharacters, {
    onSuccess(data) {
      loadedCharacters(data);
    },
    // onSuccess: loadedCharacters,
    // onError(error: AxiosError) {
    //   characterStore.loadCharactersFailed(`Error: ${error.message}`);
    // },
  });

  return {
    // Properties
    characters,
    hasError,
    errorMessage,
    isLoading,

    // Getters
    count: computed(() => characters.value.length),

    // Methods
  };
};

export default useCharacters;
