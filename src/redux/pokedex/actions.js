import PokedexActionTypes from "./action-type";

export const addPokemonToPokedex = (payload) => ({
  type: PokedexActionTypes.ADD_POKEMON,
  payload,
});

export const removePokemonFromPokedex = (payload) => ({
  type: PokedexActionTypes.REMOVE_POKEMON,
  payload,
});

export const changePokemonImage = (payload) => ({
  type: PokedexActionTypes.CHANGE_IMAGE,
  payload,
});

export const clearPokedex = () => ({
  type: PokedexActionTypes.CLEAR_POKEDEX,
});
