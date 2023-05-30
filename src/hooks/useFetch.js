import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const fetchUrl = await fetch(url);
      const resp = await fetchUrl.json();

      setData(resp);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error };
};

export default useFetch;
