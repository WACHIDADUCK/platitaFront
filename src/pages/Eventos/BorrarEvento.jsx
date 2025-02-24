import axios from "../../hooks/axios";
import { Link } from "react-router-dom";

const BorrarEvento = () => {
    const eliminar = () => {

    }
    return (
        <>
            <h2>Estás seguro de que quieres eliminar este evento</h2>
            <div>
                <button type="button">Si</button>
                <button type="button">
                    <Link to="/eventos">No</Link>
                </button>
            </div>

        </>
    );
}

export default BorrarEvento;