import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Eventos() {
    let [searchParams, setSearchParams] = useSearchParams();
    //https://guillermo.informaticamajada.es
    const { data, loading, error } = useFetch("http://platita.test/api/evento");
    const [eventos, setEventos] = useState([]);

    const handleChange = (e) => {
        searchParams.set(e.target.name, e.target.value)
        setSearchParams(searchParams);
    };

    const handleFilter = () => {
        return eventos.filter(item => {
            const nombreFilter = searchParams.get("nombre");
            const descripcionFilter = searchParams.get("descripcion");
            const fechaFilter = searchParams.get("fecha");

            // Aplicar todos los filtros a la vez
            return (
                (!nombreFilter || item.nombre.includes(nombreFilter)) &&
                (!descripcionFilter || item.descripcion.includes(descripcionFilter)) &&
                (!fechaFilter || item.fecha.includes(fechaFilter))
            );
        });
    }

    useEffect(() => {
        if (data) setEventos(data.data);
    }, [data]);

    if (loading || !eventos) return (<h1>Buscando la dimensión adecuada...</h1>);
    if (error) return (<h1>La pistola de portales no funciona...</h1>);

    return (
        <div>
            <h1>Eventos</h1>
            <input type="text" name="nombre" onChange={handleChange} alt='Buscador' value={searchParams.get("nombre") || ""} />
            <input type="text" name="descripcion" onChange={handleChange} alt='Buscador' value={searchParams.get("descripcion") || ""} />
            <div>
                {handleFilter().map(evento => {
                    return <div key={evento.id}>
                        <h2>Nombre:{evento.nombre} | Descripcion:{evento.descripcion}</h2>
                    </div>
                })}
            </div>
        </div>
    )
}