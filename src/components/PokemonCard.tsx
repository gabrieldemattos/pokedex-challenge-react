//css
import styles from "./PokemonCard.module.css";

//gif
import gif from "../img/gif/pokeball.gif";

//router-dom
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemonToPokedex,
  removePokemonFromPokedex,
} from "../redux/pokedex/actions";
import { RootState } from "../redux/root-reducer";

//utils
import { colorMap } from "../utils/utils";

//hooks
import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

//interfaces
import { ITypes } from "../interfaces/ITypes";

//components
import Error from "./layout/Error";
import Loader from "./layout/Loader";
import Button from "./Button";

interface Pokemon {
  name: string;
  url: string;
}

type Props = {
  data: Pokemon;
};

const PokemonCard = ({ data }: Props) => {
  const { pokedex } = useSelector(
    (rootReducer: RootState) => rootReducer.pokedexReducer
  );
  const dispatch = useDispatch();

  interface Sprites {
    front_default: string;
  }

  interface PokemonData {
    name: string;
    id: number;
    sprites: Sprites;
    types: ITypes[];
  }

  const { data: pokemon, error, loading } = useFetch<PokemonData>(data.url);

  const [pokemonType, setPokemonType] = useState<string>("");

  const checkType = useCallback((type: string): void => {
    setPokemonType(colorMap[type] || "");
  }, []);

  useEffect((): void => {
    if (pokemon?.types?.[0]) {
      checkType(pokemon.types[0].type.name);
    }
  }, [pokemon, checkType]);

  //add to pokedex
  const handleAddToPokedex = (name: string, img: string): void => {
    dispatch(addPokemonToPokedex({ name, img }));
  };

  //remove from pokedex
  const handleRemoveFromPokedex = (name: string): void => {
    dispatch(removePokemonFromPokedex(name));
  };

  //check if the pokemon is already in the pokedex
  interface PokemonName {
    name: string;
  }

  const pokemonExistsInPokedex = (pokemon: string): PokemonName | undefined => {
    return pokedex.find((poke: PokemonName) => poke.name === pokemon);
  };

  return (
    <>
      {pokemon && !loading && !error && (
        <>
          <Link to={`/pokemon/${data.name}`}>
            <div
              style={{
                background: `${pokemonType}`,
                borderRadius: ".5rem",
                transition: ".5s ease",
              }}
            >
              <div className={styles.details}>
                <img
                  src={pokemon.sprites?.front_default || gif}
                  alt={`pokemon ${pokemon.name}`}
                  loading="lazy"
                />
                <h4>Nº {pokemon.id}</h4>
                <h1>{pokemon.name}</h1>
                <div className={styles.types}>
                  {pokemon.types?.map((type) => (
                    <p key={type.type.name}>{type.type.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          {pokemonExistsInPokedex(pokemon.name) ? (
            <div className={styles.btn}>
              <Button
                text="remover da pokedex"
                handleAction={() => handleRemoveFromPokedex(pokemon?.name)}
                type="btn_remove"
              />
            </div>
          ) : (
            <div className={styles.btn}>
              <Button
                text="adicionar a pokedex"
                handleAction={() =>
                  handleAddToPokedex(
                    pokemon.name,
                    pokemon.sprites?.front_default
                  )
                }
                type="btn_add"
              />
            </div>
          )}
        </>
      )}
      {loading && <Loader />}
      {error && <Error />}
    </>
  );
};

export default PokemonCard;
