import PokedexActionTypes from "./action-type";

interface PokemonNameImg {
  name: string;
  img: string;
}

export const addPokemonToPokedex = (payload: PokemonNameImg | {}) => ({
  type: PokedexActionTypes.ADD_POKEMON,
  payload,
});

export const removePokemonFromPokedex = (payload: string) => ({
  type: PokedexActionTypes.REMOVE_POKEMON,
  payload,
});

export const changePokemonImage = (payload: PokemonNameImg | {}) => ({
  type: PokedexActionTypes.CHANGE_IMAGE,
  payload,
});

export const clearPokedex = () => ({
  type: PokedexActionTypes.CLEAR_POKEDEX,
});
