import SearchActionTypes from "./action-type";

interface searchPokemon{
  name: string;
  url: string;
}

export const searchPokemonByName = (payload: searchPokemon | {}) => ({
  type: SearchActionTypes.SEARCH_POKEMON_NAME,
  payload,
});

export const searchPokemonByType = (payload: searchPokemon | {}) => ({
  type: SearchActionTypes.SEARCH_POKEMON_TYPE,
  payload,
});
