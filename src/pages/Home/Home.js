//css
import styles from "./Home.module.css";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//hooks
import { useRef, useState } from "react";

//components
import PokemonCard from "../../components/PokemonCard";
import Loader from "../../components/layout/Loader";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/layout/Error";
import BackToTop from "../../components/BackToTop";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const refContainer = useRef(null);

  let url = `https://pokeapi.co/api/v2/pokemon?limit=48&offset=${
    (currentPage - 1) * 48
  }`;

  const { data, loading, error } = useFetch(url);

  //next and previous page
  const MAX_PAGES = 27;
  const totalPages = Math.min(MAX_PAGES, currentPage + 10);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  const pages = [];

  for (let i = currentPage; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        disabled={loading}
        className={`${i === currentPage ? styles.active : ""}`}
      >
        {i}
      </button>
    );
  }

  //animation on load (class in index.css)
  const load = () => {
    const ref = refContainer.current;

    setTimeout(() => {
      if (ref.classList.contains("onload")) {
        ref.classList.remove("onload");
      }
    }, 2100);
  };

  return (
    <Container
      ref={refContainer}
      onLoad={load}
      className={`${styles.container} onload`}
    >
      <div className={styles.back_to_top}>
        <BackToTop scroll={400} />
      </div>
      {data.results && !loading && !error && (
        <Row>
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1 || loading}
            >
              {"<<"}
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              {"<"}
            </button>
            {pages}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              {">"}
            </button>
            <button
              onClick={() => handlePageChange(MAX_PAGES)}
              disabled={currentPage === totalPages || loading}
            >
              {">>"}
            </button>
          </div>
          {data &&
            data.results.map((pokemon) => (
              <Col sm={2} key={pokemon.name} className="mb-4">
                <PokemonCard data={pokemon} />
              </Col>
            ))}
        </Row>
      )}
      {loading && !error && <Loader />}
      {error && <Error />}
    </Container>
  );
}

export default Home;
