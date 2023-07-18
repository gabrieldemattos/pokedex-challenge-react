//hooks
import { useState } from "react";

//css
import styles from "./Navbar.module.css";

//bootstrap
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { searchPokemonByName } from "../../redux/search/actions";

//components
import MyPokedexButton from "../MyPokedexButton";

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [queryValue, setQueryValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!queryValue) {
      dispatch(searchPokemonByName({}));
      navigate("/");
      return;
    }

    dispatch(
      searchPokemonByName({
        name: queryValue,
        url: `https://pokeapi.co/api/v2/pokemon/${queryValue}`,
      })
    );
    navigate("/search?q=" + queryValue);
    return;
  };

  return (
    <Container>
      <nav className={styles.navbar}>
        <MyPokedexButton />
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Busque por um pokémon"
              onChange={(e) =>
                setQueryValue(e.target.value.toLocaleLowerCase())
              }
              value={queryValue}
            />
            <button>Buscar</button>
          </form>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;
