import { useCallback, useEffect, useState } from "react";

type FetchResult<T> = {
  data: T | null,
  loading: boolean,
  error: boolean,
};

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
}

export default useFetch;
