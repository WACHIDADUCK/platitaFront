import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/asociaciones.css';
import { format } from 'date-fns';
import { useProvider } from '../providers/ContextProvider';
import axios from "../hooks/axios";

export default function Asociaciones() {
    const { state } = useProvider();
    const [asociacion, setAsociacion] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newComment, setNewComment] = useState("");
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;


    const id = useParams().id;
    useEffect(() => {
        if (state?.asociaciones) setAsociacion(state.asociaciones.find(asociacion => asociacion.id == id));
    }, [state]);

    const numeroMiembros = asociacion?.users?.length;
    const gestor = asociacion?.users?.find(user => user.id == asociacion.gestor_id);
    const comentarios = asociacion?.comentarios;
    const usuarios = asociacion?.users;
    // const esGestor = if(asociacion?.gestor_id == idUser) true;
    console.log(asociacion);

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`/api/comentario`, {
                user_id: idUser,// Asegúrate de que el usuario esté autenticado y su ID esté disponible en el estado
                comentario: newComment,
                comentarioable_type: "App\\Models\\Asociacion",
                comentarioable_id: asociacion.id
            });

            console.log("Nuevo comentario:", response.data);
            setShowModal(false);
            // Actualiza los comentarios localmente para reflejar el nuevo comentario
            window.location.reload();
        } catch (error) {
            console.error("Error añadiendo el comentario:", error);
        }
    };

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
                    <Link to={`/asociacion/editar/${asociacion.id}`} className="link" >Editar Asociacion</Link>
                </div>

                <div className="asideDiv justify-center divBotonCrearAsociacion boton">
                    <Link className="link" to="/crear_evento">Crear Evento</Link>
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
                        <div className="cabecera">
                            <h4 className="naranja">Comentarios</h4>
                            <button className="boton" onClick={() => setShowModal(true)}>Añadir comentario</button>
                        </div>

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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Añadir Comentario</h2>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe tu comentario aquí..."
                        />
                        <button className="boton" onClick={handleAddComment}>Enviar</button>
                    </div>
                </div>
            )}
        </div>
    );
}