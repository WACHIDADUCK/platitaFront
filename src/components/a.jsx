import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Asociacion() {
    //https://guillermo.informaticamajada.es
    const { data, loading, error } = useFetch("http://platita.test/api/asociacion");
    const [asociacion, setAsociacion] = useState([]);

    useEffect(() => {
        if (data) setAsociacion(data.data[0]);
        console.log(asociacion);
        
    }, [data]);

    if (loading || !asociacion) return (<h1>Buscando la dimensión adecuada...</h1>);
    if (error) return (<h1>La pistola de portales no funciona...</h1>);

    

    return (
        <div className="asociaciones-Card-Container">

            <div className="contendorCardEventos">

                <div key={asociacion.id} className="asociacion-card">

                    <img src={asociacion.imagen} alt={asociacion.nombre} />

                    <div className="infoContainer">
                        <div className="asociacionHeader">
                            <h3>{asociacion.nombre}</h3>
                            <p>{asociacion.descripcion}</p>

                            {asociacion &&
                                    <div>
                                        <h5>Prósimo Evento:</h5>
                                    </div>}
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

            </div>
        </div>
    )
}