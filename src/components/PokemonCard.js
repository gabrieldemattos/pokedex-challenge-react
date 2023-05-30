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

//utils
import { colorMap } from "../utils/utils";

//hooks
import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

//components
import Error from "./layout/Error";
import Loader from "./layout/Loader";
import Button from "./Button";

const PokemonCard = ({ data }) => {
  const { pokedex } = useSelector((rootReducer) => rootReducer.pokedexReducer);
  const dispatch = useDispatch();

  const { data: pokemon, error, loading } = useFetch(data.url);

  const [pokemonType, setPokemonType] = useState("");

  const checkType = useCallback((type) => {
    setPokemonType(colorMap[type] || "");
  }, []);

  useEffect(() => {
    if (pokemon?.types?.[0]) {
      checkType(pokemon.types[0].type.name);
    }
  }, [pokemon, checkType]);

  //add to pokedex
  const handleAddToPokedex = (name, img) => {
    dispatch(addPokemonToPokedex({ name, img }));
  };

  //remove from pokedex
  const handleRemoveFromPokedex = (name) => {
    dispatch(removePokemonFromPokedex(name));
  };

  //check if the pokemon is already in the pokedex
  const pokemonExistsInPokedex = (pokemon) => {
    return pokedex.find((poke) => poke.name === pokemon);
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
                handleAction={() => handleRemoveFromPokedex(pokemon.name)}
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
