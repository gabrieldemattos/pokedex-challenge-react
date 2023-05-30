export const selectPokedexCount = (rootReducer) => {
  return rootReducer.pokedexReducer.pokedex.length;
};
