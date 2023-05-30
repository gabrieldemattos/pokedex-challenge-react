import { combineReducers } from "redux";

import pokedexReducer from "./pokedex/reducer";
import searchReducer from "./search/reducer";

const rootReducer = combineReducers({ pokedexReducer, searchReducer });

export default rootReducer;
