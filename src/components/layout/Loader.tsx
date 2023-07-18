//css
import styles from "./Loader.module.css";

//gif
import gif from "../../img/gif/pokeball.gif";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={gif} alt="gif de pokebola" />
      <h1>Carregando dados...</h1>
    </div>
  );
};

export default Loader;
