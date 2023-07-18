import PokedexActionTypes from "./action-type";

interface Pokemon {
  name: string;
  img: string;
}

interface PokedexState {
  pokedex: Pokemon[];
}

const initialState: PokedexState = {
  pokedex: [],
};

const pokedexReducer = (state = initialState, action: any): PokedexState => {
  switch (action.type) {
    case PokedexActionTypes.ADD_POKEMON:
      return { ...state, pokedex: [...state.pokedex, action.payload] };
    case PokedexActionTypes.REMOVE_POKEMON:
      return {
        ...state,
        pokedex: state.pokedex.filter(
          (pokemon) => pokemon.name !== action.payload
        ),
      };
    case PokedexActionTypes.CHANGE_IMAGE:
      const index = state.pokedex.findIndex(
        (pokemon) => pokemon.name === action.payload.name
      );
      const updatedPokemon: Pokemon = {
        ...state.pokedex[index],
        img: action.payload.img,
      };
      const updatedPokedex = state.pokedex.map((pokemon, i) => {
        if (i === index) {
          return updatedPokemon;
        }
        return pokemon;
      });
      return {
        ...state,
        pokedex: updatedPokedex,
      };
    case PokedexActionTypes.CLEAR_POKEDEX:
      return { ...state, pokedex: [] };
    default:
      return state;
  }
};

export default pokedexReducer;
