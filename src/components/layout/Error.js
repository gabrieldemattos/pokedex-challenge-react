//css
import styles from "./Error.module.css";

//img
import errorImg from "../../img/error/sad-pikachu.png";

const Error = () => {
  return (
    <div className={styles.error}>
      <img src={errorImg} alt="pikachu triste" />
      <h1>Ocorreu um erro ao carregar os dados, tente novamente..</h1>
    </div>
  );
};

export default Error;
