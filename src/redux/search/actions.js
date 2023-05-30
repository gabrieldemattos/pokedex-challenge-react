import SearchActionTypes from "./action-type";

export const searchPokemonByName = (payload) => ({
  type: SearchActionTypes.SEARCH_POKEMON_NAME,
  payload,
});

export const searchPokemonByType = (payload) => ({
  type: SearchActionTypes.SEARCH_POKEMON_TYPE,
  payload,
});
