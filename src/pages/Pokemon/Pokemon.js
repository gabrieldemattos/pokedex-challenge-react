//css
import styles from "./Pokemon.module.css";

//router-dom
import { Link, useParams } from "react-router-dom";

//hooks
import { useCallback, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useShortEffect from "../../hooks/useShortEffect";
import useFetchEvolutions from "../../hooks/useFetchEvolutions";

//icons
import { IoArrowBackCircleSharp } from "react-icons/io5";

//utils
import { colorMap } from "../../utils/utils";

//bootstrap
import Container from "react-bootstrap/Container";

//components
import Loader from "../../components/layout/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemonToPokedex,
  removePokemonFromPokedex,
} from "../../redux/pokedex/actions";
import Button from "../../components/Button";

const Pokemon = () => {
  const dispatch = useDispatch();
  const { pokedex } = useSelector((rootReducer) => rootReducer.pokedexReducer);

  const [pokemonType, setPokemonType] = useState("");
  const [dataEvolution, setDataEvolutions] = useState([]);

  const {
    handleHability,
    shortEffect,
    setShortEffect,
    loadingEffect,
    errorEffect,
  } = useShortEffect();

  const { name } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  const { data, loading, error } = useFetch(url);
  const {
    name: pokemonName,
    sprites,
    species,
    id,
    height,
    weight,
    abilities,
    types,
    stats,
  } = data ?? {};

  const { evolutions } = useFetchEvolutions(species);

  const checkType = useCallback((type) => {
    setPokemonType(colorMap[type] || "");
  }, []);

  useEffect(() => {
    if (data?.types?.[0]) {
      checkType(data.types[0].type.name);
    }
  }, [data, checkType]);

  //fetch each evolution
  useEffect(() => {
    const fetchPokemon = async (pokemon) => {
      const fetchResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const fetchData = await fetchResponse.json();

      return fetchData;
    };

    if (evolutions.length >= 1) {
      const promises = evolutions
        .filter((evo) => evo !== "Unknown")
        .map((evo) => fetchPokemon(evo));
      Promise.all(promises).then((data) => setDataEvolutions(data));
    }
  }, [evolutions]);

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
    <div className={styles.container}>
      <div className={styles.button}>
        <Link to="/">
          <button>
            <IoArrowBackCircleSharp />
          </button>
        </Link>
      </div>
      {data && !loading && !error && dataEvolution.length > 0 ? (
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.pokemon_perfil}>
              <h1>{pokemonName?.toUpperCase()}</h1>
              <img src={sprites?.front_default} alt={pokemonName} />
              {pokemonExistsInPokedex(pokemonName) ? (
                <Button
                  text="remover da pokedex"
                  handleAction={() => handleRemoveFromPokedex(pokemonName)}
                  type="btn_remove"
                />
              ) : (
                <Button
                  text="adicionar a pokedex"
                  handleAction={() =>
                    handleAddToPokedex(pokemonName, sprites?.front_default)
                  }
                  type="btn_add"
                />
              )}
            </div>
            <div className={styles.pokemon_datas}>
              <div className={styles.details}>
                <h2>ID:</h2> <h2> #{id}</h2>
              </div>
              <div className={styles.details}>
                <h2>Height:</h2> <h2> {height}</h2>
              </div>
              <div className={styles.details}>
                <h2>Weight:</h2> <h2> {weight}</h2>
              </div>
              <div className={styles.abilities}>
                <h2 className={styles.data}>Abilities:</h2>
                <div className={styles.hability_container}>
                  {abilities?.map((hability, index) => (
                    <h2
                      key={index}
                      className={styles.hability}
                      style={{ background: pokemonType }}
                      onClick={() =>
                        handleHability(abilities[index].ability.url)
                      }
                    >
                      {hability.ability.name.toUpperCase()}
                    </h2>
                  ))}
                </div>
              </div>
              <div className={styles.types}>
                <h2 className={styles.data}>Type:</h2>
                <div className={styles.type_container}>
                  {types?.map((type, index) => (
                    <h2
                      key={index}
                      className={styles.type}
                      style={{
                        background: colorMap[type.type.name] || "",
                        boxShadow: `1px 1px 10px 3px ${
                          colorMap[type.type.name]
                        }`,
                      }}
                    >
                      {type.type.name.toUpperCase()}
                    </h2>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.pokemon_stats}>
              <div className={styles.stats}>
                {stats?.map((stat) => (
                  <div className={styles.stats_value} key={stat.stat.name}>
                    <h2>{stat.stat.name}: </h2>
                    <h2>{stat.base_stat}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.short_effect}>
            {shortEffect !== "" && !loadingEffect && !errorEffect && (
              <p>{shortEffect}</p>
            )}
            {loadingEffect && <p>Carregando...</p>}
            {errorEffect && <p>Ocorreu um erro, tente novamente {":("}</p>}
          </div>
          <div className={styles.evolutions}>
            {dataEvolution.map((evolution) => (
              <div className={styles.evolution} key={evolution.name}>
                <Link
                  to={`/pokemon/${evolution.name}`}
                  onClick={() => setShortEffect("")}
                >
                  <div>
                    <img
                      src={evolution.sprites.front_default}
                      alt={evolution.name}
                    />
                  </div>
                </Link>
                <div>
                  <h1>Nome: {evolution.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Pokemon;
