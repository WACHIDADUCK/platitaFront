import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import axios from "../hooks/axios";

export default function Eventos() {
    let [searchParams, setSearchParams] = useSearchParams();
    //https://guillermo.informaticamajada.es
    const { data, loading, error } = useFetch("https://platita.test/api/evento");
    const [eventos, setEventos] = useState([]);

    const handleChange = (e) => {
        searchParams.set(e.target.name, e.target.value)
        setSearchParams(searchParams);
    };

    const handleFilter = () => {
        return eventos.filter(item => {
            const nombreFilter = searchParams.get("nombre");
            const descripcionFilter = searchParams.get("descripcion");
            const tipoFilter = searchParams.get("tipo");
            const fechaInicioFilter = searchParams.get("fecha_inicio");
            const fechaFinFilter = searchParams.get("fecha_fin");
            const aforoFilter = searchParams.get("aforo");
            const accesibilidadFilter = searchParams.get("accesibilidad");
            const estadoFilter = searchParams.get("estado");

            // Aplicar todos los filtros a la vez
            return (
                (!nombreFilter || item.nombre.includes(nombreFilter)) &&
                (!descripcionFilter || item.descripcion.includes(descripcionFilter)) &&
                (!tipoFilter || item.tipo == tipoFilter) &&
                (!fechaInicioFilter || item.fecha_inicio == fechaInicioFilter) &&
                (!fechaFinFilter || item.fecha_fin == fechaFinFilter) &&
                (!aforoFilter || item.aforo >= aforoFilter) &&
                (!accesibilidadFilter || item.accesibilidad == accesibilidadFilter) &&
                (!estadoFilter || item.estado == estadoFilter)
            );
        });
    }

    useEffect(() => {
        if (data) setEventos(data.data);
    }, [data]);

    if (loading || !eventos) return (<h1>Buscando la dimensión adecuada...</h1>);
    if (error) return (<h1>La pistola de portales no funciona...</h1>);
    console.log(handleFilter())

    return (
        <div>
            <h1>Eventos</h1>
            <input type="text" name="nombre" onChange={handleChange} alt='Buscador' value={searchParams.get("nombre") || ""} />

            <input type="text" name="descripcion" onChange={handleChange} alt='Buscador' value={searchParams.get("descripcion") || ""} />

            <select name="tipo" onChange={handleChange} alt='Buscador' value={searchParams.get("tipo") || ""}>
                <option value=""></option>
                <option value="evento">evento</option>
                <option value="actividad">actividad</option>
            </select>

            <input type="datetime-local" name="fecha_inicio" onChange={handleChange} alt='Buscador' value={searchParams.get("fecha_inicio") || ""} />
            <input type="datetime-local" name="fecha_fin" onChange={handleChange} alt='Buscador' value={searchParams.get("fecha_fin") || ""} />

            <input type="number" name="aforo" onChange={handleChange} alt='Buscador' value={searchParams.get("aforo") || ""} />

            <select name="accesibilidad" onChange={handleChange} alt='Buscador' value={searchParams.get("accesibilidad") || ""}>
                <option value=""></option>
                <option value="socios">socios</option>
                <option value="publico">publico</option>
                <option value="privado">privado</option>
                <option value="mixto">mixto</option>
            </select>

            <select name="estado" onChange={handleChange} alt='Buscador' value={searchParams.get("estado") || ""}>
                <option value=""></option>
                <option value="abierto">abierto</option>
                <option value="cerrado">cerrado</option>
            </select>
            
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