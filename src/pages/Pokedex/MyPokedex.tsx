import { ChangeEvent } from "react";

//hooks
import { useState, useCallback, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useShortEffect from "../../hooks/useShortEffect";
import useFetchEvolutions from "../../hooks/useFetchEvolutions";

//css
import styles from "./MyPokedex.module.css";

//icons
import { BsTrash3 } from "react-icons/bs";

//utils
import { colorMap } from "../../utils/utils";

//react-redux
import { useDispatch, useSelector } from "react-redux";
import {
  removePokemonFromPokedex,
  changePokemonImage,
  clearPokedex,
} from "../../redux/pokedex/actions";
import { searchPokemonByType } from "../../redux/search/actions";
import { selectPokedexCount } from "../../redux/pokedex/pokedex.selectors";
import { RootState } from "../../redux/root-reducer";

//components
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//react router
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/layout/Error";
import Loader from "../../components/layout/Loader";

//interfaces
import { IPokemonData } from "../../interfaces/IPokemonData";

const MyPokedex = () => {
  const navigate = useNavigate();
  const pokedexCount = useSelector(selectPokedexCount);

  const { pokedex } = useSelector(
    (rootReducer: RootState) => rootReducer.pokedexReducer
  );
  const dispatch = useDispatch();

  interface SelectedPokemon {
    name: string;
    img?: string;
  }

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon[]>([]);
  const [pokemonType, setPokemonType] = useState<string>("");

  const {
    handleHability,
    shortEffect,
    setShortEffect,
    loadingEffect,
    errorEffect,
  } = useShortEffect();

  const url =
    selectedPokemon.length > 0
      ? `https://pokeapi.co/api/v2/pokemon/${selectedPokemon[0]?.name}`
      : undefined;

  const { data, error, loading } = useFetch<IPokemonData>(url ? url : "");

  const { name, species, id, height, weight, abilities, types, stats } =
    data ?? {};

  const { evolutions } = useFetchEvolutions(species!);

  //check the type of pokémon and select the color accordingly
  const checkType = useCallback((type: string): void => {
    setPokemonType(colorMap[type] || "");
  }, []);

  useEffect((): void => {
    if (types?.[0]) {
      checkType(types[0].type.name);
    }
  }, [types, checkType]);

  //remove from pokedex
  const handleRemoveFromPokedex = (name: string): void => {
    dispatch(removePokemonFromPokedex(name));
    setSelectedPokemon([]);
  };

  //clear pokedex
  const handleClearPokedex = (): void => {
    if (pokedexCount > 0) {
      const userResponse = window.confirm(
        "Você tem certeza que deseja excluir todos os Pokémon da sua pokedéx?"
      );

      if (userResponse) {
        dispatch(clearPokedex());
        setSelectedPokemon([]);
        return;
      } else {
        return;
      }
    }

    return alert(
      "Sua Pokédex já está vazia. Adicione mais Pokémon à sua coleção!"
    );
  };

  //search pokemon by type
  const handleSearchType = async (name: string, url: string): Promise<void> => {
    const fetchUrl = await fetch(url);
    const resp = await fetchUrl.json();
    const data = await resp.pokemon;

    dispatch(
      searchPokemonByType({ name: `Pokémon do tipo ${name}`, url: await data })
    );

    navigate(`/pokemon/type/${name}`);
  };

  //handle selected pokemon
  const handleSelectedPokemon = (pokemon: string): void => {
    setShortEffect("");
    setImageSrc("");

    const filteredPokemon = pokedex.filter((poke) => poke.name === pokemon);

    setSelectedPokemon(filteredPokemon);
  };

  //change img
  const handleChangeImg = (
    name: string
  ): void | ReturnType<typeof dispatch> => {
    if (imageSrc) {
      setSelectedPokemon([{ name, img: imageSrc }]);
      return dispatch(changePokemonImage({ name, img: imageSrc }));
    }

    return;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageSrc(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.pokemon_list}>
            <div className={styles.button}>
              {pokedex.length > 0 && (
                <button
                  onClick={handleClearPokedex}
                  className={styles.clear_button}
                >
                  Limpar pokedex
                </button>
              )}
            </div>
            <ul>
              {pokedex.map((pokemon) => (
                <li key={pokemon.name}>
                  <span onClick={() => handleRemoveFromPokedex(pokemon.name)}>
                    <BsTrash3 />
                  </span>
                  <span onClick={() => handleSelectedPokemon(pokemon.name)}>
                    {pokemon.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.pokemon_info}>
            {data && !error && !loading && selectedPokemon && (
              <>
                <div className={styles.pokemon_perfil}>
                  <div className={styles.perfil}>
                    <h1>
                      Nº {id} - {name}
                    </h1>
                    <img src={selectedPokemon[0]?.img} alt={name} />
                    <form onSubmit={handleSubmit}>
                      <input type="file" onChange={handleFileSelect} />
                      <input
                        type="submit"
                        value="Enviar nova imagem"
                        onClick={() => handleChangeImg(name!)}
                      />
                    </form>
                    <div className={styles.types}>
                      <ul>
                        {types?.map((type) => (
                          <Link
                            to={`/pokemon/type/${type.type.name}`}
                            key={type.type.name}
                          >
                            <li
                              style={{
                                background: colorMap[type.type.name] || "",
                                boxShadow: `1px 1px 10px 3px ${
                                  colorMap[type.type.name]
                                }`,
                              }}
                              onClick={() =>
                                handleSearchType(type.type.name, type.type.url)
                              }
                            >
                              {type.type.name}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.perfil_stats}>
                      <ul>
                        <li>Height: {height}</li>
                        <li>Weight: {weight}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={styles.pokemon_stats}>
                  <Tabs
                    defaultActiveKey="stats"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                  >
                    <Tab eventKey="stats" title={<h3>Stats</h3>}>
                      <div className={styles.stats}>
                        {stats &&
                          stats.map((stat) => (
                            <div className={styles.stat} key={stat.stat.name}>
                              <div className={styles.base_stat}>
                                <div
                                  style={{
                                    height: `${stat.base_stat}%`,
                                    background: pokemonType,
                                    color:
                                      pokemonType === "#424242"
                                        ? "#fff"
                                        : undefined,
                                  }}
                                >
                                  <p>{stat.base_stat}</p>
                                </div>
                              </div>
                              <h2>{stat.stat.name}</h2>
                            </div>
                          ))}
                      </div>
                    </Tab>
                    <Tab eventKey="abilities" title={<h3>Abilities</h3>}>
                      <div className={styles.hability}>
                        <div className={styles.abilities}>
                          <ul>
                            {abilities?.map((hability, index) => (
                              <li
                                key={index}
                                style={{
                                  background: `${pokemonType}`,
                                  color:
                                    pokemonType === "#424242"
                                      ? "#fff"
                                      : undefined,
                                }}
                                onClick={() =>
                                  handleHability(hability.ability.url)
                                }
                              >
                                {hability.ability.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={styles.short_effect}>
                          <h2>skill short effect:</h2>
                          {shortEffect !== "" &&
                            !loadingEffect &&
                            !errorEffect && <h3>{shortEffect}</h3>}
                          {loadingEffect && <h3>Carregando...</h3>}
                          {errorEffect && (
                            <h3>Ocorreu um erro, tente novamente {":("}</h3>
                          )}
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="evolutions" title={<h3>Evolutions</h3>}>
                      <div className={styles.evolutions}>
                        <ul>
                          {evolutions.length > 0 ? (
                            evolutions.map((evolution, index) => (
                              <li key={evolution}>
                                <Link to={`/pokemon/${evolution}`}>
                                  <h2>{evolution}</h2>
                                </Link>
                                <h3>{index + 1}º evolução</h3>
                              </li>
                            ))
                          ) : (
                            <h3>Carregando..</h3>
                          )}
                        </ul>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </>
            )}
            {selectedPokemon.length === 0 && pokedex.length > 0 && (
              <h1 className={styles.title}>Selecione um Pokémon da lista.</h1>
            )}
            {pokedex.length === 0 && (
              <h1 className={styles.title}>Sua Pokedéx está vazia.</h1>
            )}
            {loading && <Loader />}
            {error && selectedPokemon.length > 0 && <Error />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyPokedex;
