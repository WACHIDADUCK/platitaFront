import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../styles/eventos.css';
import { useProvider } from '../../providers/ContextProvider';
import ListaEventos from '../../components/ListaEventos';
import ListaEventosAside from "../../components/ListaEventosAside";

export default function Eventos() {
    const { state, filtrarEventosAcreditados } = useProvider();
    const [searchParams, setSearchParams] = useSearchParams();
    const [eventos, setEventos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [buscarNombre, setBuscarNombre] = useState("");

    useEffect(() => {
        const busquedaParams = searchParams.get("busqueda");
        if (busquedaParams) {
            setBuscarNombre(busquedaParams);
        }
    }, [searchParams]);

    useEffect(() => {
        if (state.eventos) setEventos(filtrarEventosAcreditados());
    }, [state]);

    useEffect(() => {
        handleChange();
    }, [fechaInicio, fechaFin, buscarNombre, state.eventos]);

    const handleChange = () => {
        if (!state.eventos) return;

        let filteredEventos = filtrarEventosAcreditados();

        if (buscarNombre.toLowerCase() !== "") {
            filteredEventos = filteredEventos.filter(evento => evento.nombre.toLowerCase().includes(buscarNombre.toLowerCase()));
        }

        if (fechaInicio || fechaFin) {
            filteredEventos = filteredEventos.filter(evento => {
                const eventoFechaInicio = new Date(evento.fecha_inicio);
                const eventoFechaFin = new Date(evento.fecha_fin);
                const filtroFechaInicio = fechaInicio ? new Date(fechaInicio) : null;
                const filtroFechaFin = fechaFin ? new Date(fechaFin) : null;

                if (filtroFechaInicio && filtroFechaFin) {
                    return eventoFechaInicio >= filtroFechaInicio && eventoFechaFin <= filtroFechaFin;
                } else if (filtroFechaInicio) {
                    return eventoFechaInicio >= filtroFechaInicio;
                } else if (filtroFechaFin) {
                    return eventoFechaFin <= filtroFechaFin;
                }
                return true;
            });
        }

        setEventos(filteredEventos);
    };

    // evento.aforo_socios - evento.contador_aforo_socios
    // evento.aforo_socios - evento.contador_aforo_socios
    const ordenar = (e) => {
        let sortedEventos = [...eventos]; // Crear una copia de los eventos actuales

        switch (e.target.value) {
            case "fechasCercanas":
                sortedEventos.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
                break;
            case "fechasLejanas":
                sortedEventos.sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio));
                break;
            case "masPlazasSocios":
                sortedEventos.sort((a, b) => (b.aforo_socios - b.contador_aforo_socios) - (a.aforo_socios - a.contador_aforo_socios));
                break;
            case "menosPLazasSocios":
                sortedEventos.sort((a, b) => (a.aforo_socios - a.contador_aforo_socios) - (b.aforo_socios - b.contador_aforo_socios));
                break;
            case "masPlazasNoSocios":
                sortedEventos.sort((a, b) => ((b.aforo_no_socios - b.contador_aforo_no_socios) - (a.aforo_no_socios - a.contador_aforo_no_socios)));
                break;
            case "menosPlazasNoSocios":
                sortedEventos.sort((a, b) => (a.aforo_no_socios - a.contador_aforo_no_socios) - (b.aforo_no_socios - b.contador_aforo_no_socios));
                break;
            default:
                break;
        }

        setEventos(sortedEventos);
    };

    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    const misEventos = state.eventos ? state.eventos.filter(evento => evento.asociacions.find(asociacion => asociacion.gestor_id == idUser) && evento.estado == "abierto") : [];
    const asistireEventos = state.eventos ? filtrarEventosAcreditados().filter(evento => evento.users.find(user => user.id == idUser) && evento.estado == "abierto") : [];

    return (
        <div className="asociacionesContainer">
            <div className="col-1">
                <div className="asideDiv">
                    <ListaEventosAside eventos={misEventos} cabecero={"Mis eventos"} />
                </div>

                <div className="asideDiv">
                    <ListaEventosAside eventos={asistireEventos} cabecero={"Eventos que asistiré"} />
                </div>
            </div>
            <div className="col-2">
                <div className="eventos-container">

                    <h1 className="naranja">Eventos</h1>
                    <div className="filtros">
                        <input
                            type="text"
                            name="nombre"
                            onChange={(e) => setBuscarNombre(e.target.value)}
                            placeholder="Buscar Evento"
                            value={buscarNombre}
                        />
                    </div>

                    <div className="filtros">
                        <div>
                            <label htmlFor="fechaInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                name="fechaInicio"
                                onChange={(e) => setFechaInicio(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="fechaFin">Fecha Fin</label>
                            <input
                                type="date"
                                name="fechaFin"
                                onChange={(e) => setFechaFin(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="ordenar">Ordenar por</label>
                            <select
                                name="ordenar"
                                onChange={(e) => ordenar(e)}
                            >
                                <option value="fechasCercanas">Fechas Cercanas</option>
                                <option value="fechasLejanas">Fechas Lejanas</option>
                                <option value="masPlazasSocios"> + Plazas Disponibles socios</option>
                                <option value="menosPLazasSocios"> - Plazas Disponibles socios</option>
                                <option value="masPlazasNoSocios"> + Plazas Disponibles No Socios</option>
                                <option value="menosPlazasNoSocios"> - Plazas Disponibles No Socios</option>
                            </select>
                        </div>

                    </div>

                    <div className="eventos-lista">
                        <ListaEventos eventos={eventos} />
                    </div>
                </div>
            </div>
        </div>
    );
}