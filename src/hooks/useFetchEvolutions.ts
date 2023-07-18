import { useState, useEffect, useCallback } from "react";

type Species = {
  name: string;
  url: string;
}

const useFetchEvolutions = (species: Species) => {
  const [evolutions, setEvolutions] = useState<string []>([]);

  type EvolutionChain = [string, string, string];

  //fetch each evolution
  const fetchEvolutionChain = useCallback(async (speciesUrl: string): Promise<EvolutionChain> => {
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
  }, [])

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
  }, [species, fetchEvolutionChain]);

  return { evolutions };
};

export default useFetchEvolutions;
