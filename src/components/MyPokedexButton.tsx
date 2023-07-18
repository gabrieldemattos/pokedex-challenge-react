//react-router-dom
import { Link } from "react-router-dom";

//css
import styles from "./MyPokedexButton.module.css";

//icons
import { TbPokeball } from "react-icons/tb";

//redux
import { selectPokedexCount } from "../redux/pokedex/pokedex.selectors";
import { useSelector } from "react-redux";

const MyPokedexButton = () => {
  const totalPokemonInPokedex: number = useSelector(selectPokedexCount);

  return (
    <Link to="/my-pokedex">
      <div className={styles.pokedex}>
        <p>
          <TbPokeball />
        </p>
        <span>Minha Pokedéx ({totalPokemonInPokedex})</span>
      </div>
    </Link>
  );
};

export default MyPokedexButton;
