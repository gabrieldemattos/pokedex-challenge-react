import SearchActionTypes from "./action-type";

const inititalState = {
  query: [],
};

const searchReducer = (state = inititalState, action) => {
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
