import styles from "./Header.module.css";

//imgs
import logo from "../../img/logo/pokedexlogo.png";

//router-dom
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div></div>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo pokémon" />
      </Link>
    </header>
  );
};

export default Header;
