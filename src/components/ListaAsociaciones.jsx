import { Link } from "react-router-dom";

export default function ListaAsociaciones({ asociaciones }) {

    return (
        <div className="contendorCardEventos">
            {asociaciones.filter(asociacion => asociacion.acreditado).map(asociacion => {
                return <Link to={`/asociacion/${asociacion.id}`} key={asociacion.id} className="asideDivAsociaciones">

                    <div className="contenerdorImg">
                        <img src={asociacion.imagen} alt={asociacion.nombre} className="img" />
                    </div>
                    <div className="infoContainer">
                        <div className="asociacionHeader">
                            <h3>{asociacion.nombre}</h3>

                            <div className="asociacionInfo">
                                <div>
                                    <img src="./img/people.svg" alt="" className="icon" /><p>{asociacion.users.length} socios </p>
                                </div>
                                <div>
                                    <img src="./img/speech.svg" alt="" className="icon" /><p>{asociacion.eventos.length} mensajes </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            })}
        </div>
    )
}