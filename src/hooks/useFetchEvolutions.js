import { useState, useEffect } from "react";

const useFetchEvolutions = (species, url) => {
  const [evolutions, setEvolutions] = useState([]);

  //fetch each evolution
  const fetchEvolutionChain = async (speciesUrl) => {
    setEvolutions([]);
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionChainData = await evolutionChainResponse.json();

    const firstEvo = evolutionChainData.chain.species.name || "Unknown";
    const secondEvo =
      evolutionChainData.chain.evolves_to[0]?.species.name || "Unknown";
    const thirdEvo =
      evolutionChainData.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
      "Unknown";

    return [firstEvo, secondEvo, thirdEvo];
  };

  useEffect(() => {
    async function getEvolutions() {
      if (species && species.url) {
        const newEvolutions = await fetchEvolutionChain(species.url);
        setEvolutions(
          newEvolutions.filter((evolution) => evolution !== "Unknown")
        );
      }
    }
    getEvolutions();
  }, [species]);

  return { evolutions };
};

export default useFetchEvolutions;
