import { useState } from "react";

const useShortEffect = () => {
  const [shortEffect, setShortEffect] = useState("");
  const [loadingEffect, setLoadingEffect] = useState(false);
  const [errorEffect, setErrorEffect] = useState(false);

  //fetch short effect (hability)
  const handleHability = async (url) => {
    setLoadingEffect(true);
    setErrorEffect(false);

    if (url !== undefined) {
      const fetchUrl = await fetch(url);

      if (fetchUrl.ok) {
        const resp = await fetchUrl.json();

        try {
          const filteredLanguage = resp.effect_entries.filter(
            (language) => language.language.name === "en"
          );

          setShortEffect(filteredLanguage[0].short_effect);
        } catch (error) {
          console.log(error);
          setErrorEffect(true);
        } finally {
          setLoadingEffect(false);
        }
      } else {
        console.log(`HTTP error ${fetchUrl.status}`);
        setErrorEffect(true);
        setLoadingEffect(false);
      }
    }
  };

  return {
    handleHability,
    shortEffect,
    setShortEffect,
    loadingEffect,
    errorEffect,
  };
};

export default useShortEffect;
