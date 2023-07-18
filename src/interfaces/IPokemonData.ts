//interfaces
import { ISpecies } from "./ISpecies";
import { IAbilities } from "./IAbilities";
import { ITypes } from "./ITypes";
import { IStats } from "./IStats";

interface Sprite {
    front_default: string;
}

export interface IPokemonData {
    name: string;
    species: ISpecies;
    sprites?: Sprite;
    id: number;
    height: number;
    weight: number;
    abilities: IAbilities[];
    types: ITypes[];
    stats: IStats[];
}