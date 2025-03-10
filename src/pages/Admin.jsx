import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/asociaciones.css';
import { useProvider } from '../providers/ContextProvider';
import axios from "../hooks/axios";
import '../styles/admin.css';

export default function Admin() {
    const { state } = useProvider();
    const [asociaciones, setAsociaciones] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (state?.asociaciones) setAsociaciones(state.asociaciones);
    }, [state]);

    console.log(asociaciones)

    const acreditar = async (id, acreditacion) => {
        if (!window.confirm("¿Estás seguro de que quieres modificar la acreditación esta asociación?")) return;

        try {
            await axios.get(`sanctum/csrf-cookie`);
            await axios.patch(`api/asociacion/${id}`, { acreditado: !acreditacion });
            alert("Asociación actualizada correctamente");
            navigate(0);
        } catch (error) {
            console.error("Error actualizando la asociación:", error);
        }
    }

    return (
        <div className="asociacionesContainer">
            <table className="asociacion-table">
                <thead>
                    <tr className="tableHead">
                        <th>Imagen </th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Contacto</th>
                        <th>Acreditado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {asociaciones.map(asociacion => (
                        <tr key={asociacion.id} className="asociacion-item">
                            <td><img src={asociacion.imagen} alt={asociacion.nombre} /></td>
                            <td>{asociacion.nombre}</td>
                            <td>{asociacion.email}</td>
                            <td>{asociacion.contacto}</td>
                            <td>{asociacion.acreditado
                                ? <button className="btn btn-delete" onClick={() => acreditar(asociacion.id, asociacion.acreditado)}>Desacreditar</button>
                                : <button className="btn btn-edit" onClick={() => acreditar(asociacion.id, asociacion.acreditado)}>Acreditar</button>}</td>
                            <td>
                                <div className="actions">
                                    <Link to={`/asociacion/editar/${asociacion.id}`} className="btn btn-edit">Editar</Link>
                                    <Link to={`/asociacion/borrar/${asociacion.id}`} className="btn btn-delete">Eliminar</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}