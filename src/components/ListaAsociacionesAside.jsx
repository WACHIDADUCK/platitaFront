import { Link } from "react-router-dom";

export default function ListaAsociacionesAside({ asociaciones ,cabecero }) {

    return (
        <>
            <h4 className="naranja">{cabecero}</h4>
            {asociaciones?.map(asociacion => (
                <Link to={`/asociacion/${asociacion.id}`} key={asociacion.id} className="misAsociacionesContainer">
                    <div>
                        <div>
                            <img src={asociacion.imagen} alt={asociacion.nombre} className="" />
                        </div>
                        <div>
                            <h3>{asociacion.nombre}</h3>
                            <div className="asociacionInfo">
                                <div>
                                    <img src="./img/people.svg" alt="" className="icon" />
                                    <p>{asociacion.users.length} socios</p>
                                </div>
                                <div>
                                    <img src="./img/speech.svg" alt="" className="icon" />
                                    <p>{asociacion.comentarios.length} comentarios</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}