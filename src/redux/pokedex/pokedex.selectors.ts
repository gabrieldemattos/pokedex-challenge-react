import { RootState } from "../root-reducer";

export const selectPokedexCount = (rootReducer: RootState) => {
  return rootReducer.pokedexReducer.pokedex.length;
};
