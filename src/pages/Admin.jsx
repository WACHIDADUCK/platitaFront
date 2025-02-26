import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/asociaciones.css';
import { format } from 'date-fns';
import { useProvider } from '../providers/ContextProvider';
import axios from "../hooks/axios";
import '../styles/admin.css';


export default function Admin() {
    const { state } = useProvider();
    const [asociaciones, setAsociaciones] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    const id = useParams().id;
    useEffect(() => {
        if (state?.asociaciones) setAsociaciones(state.asociaciones);
    }, [state]);

    console.log(asociaciones)

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
                            <td>{asociacion.acreditado ? "SI" : "NO"} {asociacion.acreditado ? <button className="btn btn-delete">Desacreditar</button> : <button  className="btn btn-edit">Acreditar</button>}</td>
                            <td className="actions">
                                <Link to={`/editar_asociacion/${asociacion.id}`} className="btn btn-edit">Editar</Link>
                                <button className="btn btn-delete">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}