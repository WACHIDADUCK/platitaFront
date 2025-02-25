
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import '../styles/asociaciones.css';
import { format } from 'date-fns';
import { useProvider } from '../providers/ContextProvider';


export default function Asociaciones() {

    //https://guillermo.informaticamajada.es
    const { state } = useProvider();
    const [asociacion, setAsociacion] = useState([]);

    const id = useParams().id;
    useEffect(() => {
        if (state?.asociaciones) setAsociacion(state.asociaciones.find(asociacion => asociacion.id == id));
    }, [state]);

    const numeroMiembros = asociacion?.users?.length;
    const gestor = asociacion?.users?.find(user => user.id == asociacion.gestor_id);
    const comentarios = asociacion?.comentarios;
    const usuarios = asociacion?.users;


    return (
        <div className="asociacionesContainer">
            <div className="col-1">
                <div className="asideDiv divGestor">
                    <h4 className="naranja">Gestor</h4>
                    <p>{gestor?.name}</p>
                </div>

                <div className="asideDiv misAsociaciones">
                    <h4 className="naranja">{numeroMiembros} Miembros</h4>
                    <div>


                    </div>
                </div>

                <div className="asideDiv ">
                    <Link className="link" >Editar Grupo</Link>
                </div>
            </div>

            <div className="col-2">
                <div className="asociaciones-Card-Container">
                    <div className="contendorCardEventos">
                        <div key={asociacion.id} className="asociacion-card">

                            <img src={asociacion.imagen} alt={asociacion.nombre} />

                            <div className="infoContainer">
                                <div className="asociacionHeader">
                                    <h3>{asociacion.nombre}</h3>
                                    <p>{asociacion.descripcion}</p>
                                    <div className="asociacionInfo">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="sectionEvento">
                    <div key={asociacion.id} className=" comentariosAsociacionCard">
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
        </div>
    )
}