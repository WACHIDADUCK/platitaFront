import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Eventos() {
    let [searchParams, setSearchParams] = useSearchParams();
    //https://guillermo.informaticamajada.es
    const { data, loading, error } = useFetch("http://platita.test/api/evento");
    const [eventos, setEventos] = useState([]);
    const [field, setField] = useState("nombre");

    const handleChange = (e) => {
        setSearchParams({ [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        return eventos.filter(item => item[field].includes(searchParams.get(`${field}`) || ""))
    }

    useEffect(() => {
        if (data) setEventos(data.data);
    }, [data]);

    if (loading || !eventos) return (<h1>Buscando la dimensión adecuada...</h1>);
    if (error) return (<h1>La pistola de portales no funciona...</h1>);

    return (
        <div>
            <h1>Eventos</h1>
            <input type="text" name={field} onChange={handleChange} alt='Buscador' value={searchParams.get(`${field}`) || ""}></input>
            <button onClick={() => setField("nombre")}>Nombre</button>
            <button onClick={() => setField("descripcion")}>Descripción</button>
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