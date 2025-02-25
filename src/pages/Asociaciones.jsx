import { Link } from "react-router-dom";
import '../styles/asociaciones.css';
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProvider } from '../providers/ContextProvider';
import ListaAsociaciones from "../components/ListaAsociaciones";
import ListaAsociacionesAside from "../components/ListaAsociacionesAside";

export default function Asociaciones() {
    const { state } = useProvider();
    const [searchParams, setSearchParams] = useSearchParams();
    const [asociaciones, setAsociaciones] = useState([]);
    const [buscarNombre, setBuscarNombre] = useState("");

    useEffect(() => {
        const busquedaParams = searchParams.get("busqueda");
        if (busquedaParams) {
            setBuscarNombre(busquedaParams);
        }
    }, [searchParams]);

    useEffect(() => {
        if (state.asociaciones) {
            setAsociaciones(state.asociaciones);
        }

        handleChange();

    }, [state]);

    useEffect(() => {
        handleChange();
    }, [buscarNombre, state.asociaciones]);

    const handleChange = () => {
        if (!state.asociaciones) return;

        let filteredAsociaciones = state.asociaciones;

        if (buscarNombre.toLowerCase() !== "") {
            filteredAsociaciones = filteredAsociaciones.filter(asociacion => asociacion.nombre.toLowerCase().includes(buscarNombre.toLowerCase()));
        }

        setAsociaciones(filteredAsociaciones);
    };

    const idUser = 2;
    const misAsociaciones = state?.asociaciones?.filter(asociacion => asociacion.gestor_id == idUser);
    const asociacionesQueSiguo = state?.asociaciones?.filter(asociacion => asociacion.users.some(user => user.id == idUser));

    return (
        <div className="asociacionesContainer">
            <div className="col-1">
                <div className="asideDiv justify-center divBotonCrearAsociacion boton">
                    <Link className="link" to="/crear_asociacion"> Crear Asociacion</Link>
                </div>

                <div className="asideDiv misAsociaciones">
                    <ListaAsociacionesAside asociaciones={misAsociaciones} cabecero={"Mis asociaciones"} />
                </div>

                <div className="asideDiv misAsociaciones">
                    <ListaAsociacionesAside asociaciones={asociacionesQueSiguo} cabecero={"Asociaciones que sigo"} />
                </div>
            </div>
            <div className="col-2">
                <div className="asociaciones-Card-Container">
                    <div className="cards-header">
                        <h1 className="naranja">Asociaciones</h1>
                        <div className="filtros">
                            <input
                                type="text"
                                name="nombre"
                                onChange={(e) => {
                                    setBuscarNombre(e.target.value);
                                }}
                                alt='Buscador'
                                value={buscarNombre}
                                placeholder="Buscar Asociación"
                            />
                        </div>
                    </div>
                    <ListaAsociaciones asociaciones={asociaciones} cabecero={"Asociaciones"} />
                </div>
            </div>
        </div>
    );
}