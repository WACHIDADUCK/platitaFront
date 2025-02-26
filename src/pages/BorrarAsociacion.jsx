import axios from "../hooks/axios";
import { Link, useParams } from "react-router-dom";

const BorrarAsociacion = () => {
    const params = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    const eliminar = async () => {
        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.delete(`/api/asociacion/${params.id}`)
            alert("Asociación eliminado correctamente");
            window.location.href = '/asociaciones';
        } catch (error) {
            console.error("Error creando la asociación:", error);
        }
    }

    return (
        <>
            <h2>Estás seguro de que quieres eliminar esta asociación</h2>
            <div>
                <button type="button" onClick={eliminar}>Si</button>
                <button type="button">
                    <Link to="/asociaciones">No</Link>
                </button>
            </div>

        </>
    );
}

export default BorrarAsociacion;