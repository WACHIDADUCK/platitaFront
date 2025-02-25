import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import '../styles/eventos.css';
import { useProvider } from '../providers/ContextProvider';


export default function Evento() {
    const [eventos, setEventos] = useState([]);
    const { state } = useProvider();

    const idEvento = useParams().id;
    const evento = eventos.find(evento => evento.id == idEvento);


    const comentarios = evento?.comentarios;
    const usuarios = evento?.users;
    const asociaciones = evento?.asociacions;
    useEffect(() => {
        if (state?.eventos) setEventos(state.eventos);
    }, [state.eventos]);


    return (
        <div className="asociacionesContainer">
            <div className="col-1">
                <div className="asideDiv asideDivEventos ">
                    <h4 className="naranja">Evento creado por</h4>
                    {asociaciones?.map(asociacion => (
                        <Link to={`/asociacion/${asociacion.id}`} key={asociacion.id} className="misAsociacionesContainer">
                            <div className="">
                                <div className="">
                                    <img src={asociacion.imagen} alt={asociacion.nombre} className="" />
                                </div>
                                <div className="">
                                    <h3>{asociacion.nombre}</h3>
                                    <div className="asociacionInfo">
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
            <div className="col-2">
                {evento && <div className="eventoContainer">
                    <div className="eventoContainerImagenNombre">
                        <div className="divImagen">
                            <img src={evento.imagen} alt={evento.nombre} className="evento-imagen" />
                            <h3>{evento.nombre}</h3>

                        </div>
                    </div>
                    <div className="eventos-lista">
                        <div key={evento.id} className="evento-card">
                            <div className="">
                                <div className="descripcion">
                                    <p>{evento.descripcion}</p>
                                </div>
                                <div>
                                    <p>Desde<strong> {format(new Date(evento.fecha_inicio), "dd 'de' MMM, yyyy, h:mm a", { locale: es })}</strong> a <strong>{format(new Date(evento.fecha_fin), "dd 'de' MMM, yyyy, h:mm a", { locale: es })}</strong></p>
                                    <p>Lugar<strong> {evento.lugar}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }


                <div className=" comentariosAsociacionCard contenedorEventoContenedor">
                    <h4 className="naranja">Comentarios</h4>
                    <div className="comentarios">
                        {comentarios?.map(comentario => (
                            <div key={comentario.id} className="comentarioContainer">
                                <div className="nombreFecha">
                                    <p className="nombre">{usuarios.find(user => user.id == comentario.user_id)?.name} </p>
                                    <p className="fecha">{format(new Date(comentario?.fecha), "dd 'de' MMM, yyyy")}</p>
                                </div>
                                <p className="comentario">{comentario.comentario}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}