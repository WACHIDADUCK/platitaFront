import ListaAsociaciones from "../components/ListaAsociaciones";
import { Link } from "react-router-dom";

export default function Asociaciones() {

    return (
        <div className="asociacionesContainer">
            <div className="col-1">
                <div className="asideDiv justify-center">
                    <Link className="link" to="/crearAsociacion"> Crear Asociacion</Link>
                </div>

                <div className="asideDiv misAsociaciones">
                    <h4>Mis asociaciones</h4>
                </div>
            </div>
            <div className="col-2">
            <ListaAsociaciones />
            </div>
        </div>
    )
}