import axios from "../../hooks/axios";
import { Link, useParams } from "react-router-dom";

const BorrarEvento = () => {
    const params = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    const eliminar = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/evento/${params.id}`)
            alert("Evento eliminado correctamente");
            window.location.href = '/eventos';
        } catch (error) {
            console.error("Error creando el evento:", error);
        }
    }

    return (
        <>
            <h2>Estás seguro de que quieres eliminar este evento</h2>
            <div>
                <button type="button" onClick={eliminar}>Si</button>
                <button type="button">
                    <Link to="/eventos">No</Link>
                </button>
            </div>

        </>
    );
}

export default BorrarEvento;