import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function ListaAsociaciones() {
    let [searchParams, setSearchParams] = useSearchParams();
    //https://guillermo.informaticamajada.es
    const { data, loading, error } = useFetch("https://platita.test/api/asociacion");
    const [asociaciones, setAsociaciones] = useState([]);
    const [field, setField] = useState("nombre");

    const handleChange = (e) => {
        setSearchParams({ [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        return asociaciones.filter(item => item[field].includes(searchParams.get(`${field}`) || ""))
    }

    useEffect(() => {
        if (data) setAsociaciones(data.data);
        console.log(data);
    }, [data]);

    if (loading || !asociaciones) return (<h1>Buscando la dimensión adecuada...</h1>);
    if (error) return (<h1>La pistola de portales no funciona...</h1>);

    return (
        <div className="asociaciones-Card-Container">
            <div className="cards-header">
                <h2>Asociaciones</h2>
                <input type="text" name={field} onChange={handleChange} alt='Buscador' value={searchParams.get(`${field}`) || ""}></input>
                <button onClick={() => setField("nombre")}>Nombre</button>
                <button onClick={() => setField("descripcion")}>Descripción</button>

            </div>
            <div className="contendorCardEventos">
                {handleFilter().map(asociacion => {
                    return <div key={asociacion.id} className="asociacion-card">

                        <img src={asociacion.imagen} alt={asociacion.nombre} />

                        <div className="infoContainer">
                            <div className="asociacionHeader">
                                <h3>{asociacion.nombre}</h3>

                                {/* {asociacion.eventos[0] &&
                                    <div>
                                        <h5>Prósimo Evento:</h5>
                                    </div>} */}
                                <div className="asociacionInfo">
                                    <div>
                                        <img src="./img/people.svg" alt="" /><p>{asociacion.users.length} socios </p>
                                    </div>
                                    <div>
                                        <img src="./img/speech.svg" alt="" /><p>{asociacion.eventos.length} mensajes </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                })}
            </div>
        </div>
    )
}