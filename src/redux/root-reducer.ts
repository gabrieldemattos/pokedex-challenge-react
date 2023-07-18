import { combineReducers } from "redux";

import pokedexReducer from "./pokedex/reducer";
import searchReducer from "./search/reducer";

export interface RootState {
    pokedexReducer: ReturnType<typeof pokedexReducer>;
    searchReducer: ReturnType<typeof searchReducer>;
}  

const rootReducer = combineReducers({ pokedexReducer, searchReducer });

export default rootReducer;
