import api from "@/api/api";
import { reactive } from "vue";
import type { Character } from "../characters/interfaces/character";

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };
  ids: {
    list: {
      [id: string]: Character;
    };
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  };

  // Métodos de Characters
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;

  // Métodos de Characters por ID
  startLoadingCharacter: () => void;
  checkIdInStore: (id: string) => boolean;
  loadedCharacter: (character: Character) => void;
}

// Initial state
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: [],
  },

  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: null,
  },

  /// Métodos de Characters
  async startLoadingCharacters() {
    const { data } = await api.get("/character");
    this.loadedCharacters(data.results);
  },
  loadedCharacters(data: Character[] | string) {
    if (typeof data === "string") {
      return this.loadCharactersFailed(
        "La respuesta no es un arreglo de personas"
      );
    }
    this.characters = {
      count: data.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: data,
    };
  },
  loadCharactersFailed(error: string) {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: [],
    };
  },

  /// Métodos de Characters por ID
  startLoadingCharacter() {
    this.ids = {
      ...this.ids,
      isLoading: true,
      hasError: false,
      errorMessage: null,
    };
  },
  checkIdInStore(id: string) {
    return !!this.ids.list[id];
  },
  loadedCharacter(character: Character) {
    this.ids.isLoading = false;
    this.ids.list[character.id] = character;
  },
});

characterStore.startLoadingCharacters();

export default characterStore;
