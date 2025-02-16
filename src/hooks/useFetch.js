import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            if(!res.ok) throw Error("Error en la petición");
            const json = await res.json();
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }        
    }, [url]);

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
}