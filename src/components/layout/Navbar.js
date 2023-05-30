//hooks
import { useState } from "react";

//css
import styles from "./Navbar.module.css";

//bootstrap
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";

//icons
import { TbPokeball } from "react-icons/tb";

//redux
import { useDispatch, useSelector } from "react-redux";
import { searchPokemonByName } from "../../redux/search/actions";
import { selectPokedexCount } from "../../redux/pokedex/pokedex.selectors";

const Navbar = () => {
  const totalPokemonInPokedex = useSelector(selectPokedexCount);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [queryValue, setQueryValue] = useState("");

  const handleSubmit = (e) => {
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
        <Link to="/my-pokedex">
          <div className={styles.pokedex}>
            <p>
              <TbPokeball />
            </p>
            <span>Minha Pokedéx ({totalPokemonInPokedex})</span>
          </div>
        </Link>
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
