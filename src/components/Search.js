//css
import styles from "./Search.module.css";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//components
import PokemonCard from "./PokemonCard";
import BackToTop from "./BackToTop";

const Search = ({ query }) => {
  return (
    <Container>
      <div className={styles.back_to_top}>
        <BackToTop scroll={400} />
      </div>
      <div className={styles.container}>
        <h1>Resultados para: {query[0]?.name}</h1>
        <div className={styles.result_search}>
          <div>
            <Row>
              {query && Array.isArray(query[0]?.url)
                ? query[0].url?.map((search) => (
                    <Col sm={2} className="mx-auto" key={search.pokemon.name}>
                      <PokemonCard
                        data={{
                          name: search.pokemon.name,
                          url: search.pokemon.url,
                        }}
                      />
                    </Col>
                  ))
                : query.map((search) => (
                    <Col sm={2} className="mx-auto" key={search.name}>
                      <PokemonCard
                        data={{ name: search.name, url: search.url }}
                      />
                    </Col>
                  ))}
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Search;
