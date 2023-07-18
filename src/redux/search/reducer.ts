import SearchActionTypes from "./action-type";

interface SearchState {
  query: any[];
}

const initialState: SearchState = {
  query: [],
};

interface SearchPokemonByNameAction {
  type: typeof SearchActionTypes.SEARCH_POKEMON_NAME;
  payload: {
    name: string;
    url: string;
  } | {};
}

interface SearchPokemonByTypeAction {
  type: typeof SearchActionTypes.SEARCH_POKEMON_TYPE;
  payload: {
    name: string;
    url: string;
  } | {};
}

type SearchAction = SearchPokemonByNameAction | SearchPokemonByTypeAction;

const searchReducer = (state: SearchState = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_POKEMON_NAME:
      return { ...state, query: [action.payload] };
    case SearchActionTypes.SEARCH_POKEMON_TYPE:
      return { ...state, query: [action.payload] };
    default:
      return state;
  }
};

export default searchReducer;