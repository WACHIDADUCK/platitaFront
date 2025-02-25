import axios from "../../hooks/axios";
import { useParams } from "react-router-dom";
import { useProvider } from "../../providers/ContextProvider";
import { useState, useEffect } from "react";

const CambiarEvento = () => {
    const { state } = useProvider();
    const params = useParams();
    const [eventoAntiguo, setEventoAntiguo] = useState(null);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    useEffect(() => {
        if (state.eventos) {
            const evento = state.eventos.find(evento => evento.id == params.id);
            console.log(evento);
            setEventoAntiguo(evento);
        }
    }, [state.eventos, params.id]);

    if (!eventoAntiguo) return (<h1>Cargando...</h1>);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // No mutar directamente el estado, crear una nueva copia del objeto.
        setEventoAntiguo({ ...eventoAntiguo, [name]: value });
    };

    const fecha_inicio = new Date(eventoAntiguo.fecha_inicio).toISOString().slice(0, 19);
    const fecha_fin = new Date(eventoAntiguo.fecha_fin).toISOString().slice(0, 19);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("¿Estás seguro de que quieres crear este evento?")) return;

        // Crear un objeto FormData a partir del formulario
        const formData = new FormData(e.target);

        // Convertir FormData a un objeto plano
        const nuevoEvento = Object.fromEntries(formData.entries());
        nuevoEvento.aforo = parseFloat(nuevoEvento.aforo);
        nuevoEvento.aforo_socios = parseFloat(nuevoEvento.aforo_socios);
        nuevoEvento.aforo_no_socios = parseFloat(nuevoEvento.aforo_no_socios);
        nuevoEvento.voluntarios = parseFloat(nuevoEvento.voluntarios);

        console.log(nuevoEvento); // Muestra el objeto con los datos del formulario

        try {
            if (nuevoEvento.aforo_socios + nuevoEvento.aforo_no_socios > nuevoEvento.aforo) return alert("Error en la cantidad de reservas");

            if (nuevoEvento.fecha_inicio > nuevoEvento.fecha_fin) return alert("Error en las fechas");

            await axios.get("/sanctum/csrf-cookie");
            await axios.put(`/api/evento/${params.id}`, nuevoEvento);
            alert("Evento modificado correctamente");
            window.location.href = '/eventos';
        } catch (error) {
            console.error("Error creando el evento:", error);
        }
    };

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                <form method="PUT" onSubmit={handleSubmit}>
                    <h3>Crear Evento</h3>
                    <div>
                        <label htmlFor="nombre">Título</label>
                        <input type="text" placeholder="" name="nombre" required value={eventoAntiguo.nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text" rows="5" name="descripcion" required value={eventoAntiguo.descripcion} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="tipo">Tipo</label>
                        <select name="tipo" value={eventoAntiguo.tipo} onChange={handleChange}>
                            <option value="evento">evento</option>
                            <option value="actividad">actividad</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                        <input type="datetime-local" name="fecha_inicio" required value={fecha_inicio} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="fecha_fin">Fecha de Finalización</label>
                        <input type="datetime-local" name="fecha_fin" required value={fecha_fin} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="accesibilidad">Accesibilidad</label>
                        <select name="accesibilidad" value={eventoAntiguo.accesibilidad} onChange={handleChange}>
                            <option value="socios">socios</option>
                            <option value="publico">publico</option>
                            <option value="privado">privado</option>
                            <option value="mixto">mixto</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="estado">Estado</label>
                        <select name="estado" value={eventoAntiguo.estado} onChange={handleChange}>
                            <option value="abierto">abierto</option>
                            <option value="cerrado">cerrado</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="aforo">Aforo total</label>
                        <input type="number" name="aforo" required value={eventoAntiguo.aforo} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="aforo_socios">Aforo de socios</label>
                        <input type="number" name="aforo_socios" required value={eventoAntiguo.aforo_socios} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="aforo_no_socios">Aforo de invitados</label>
                        <input type="number" name="aforo_no_socios" required value={eventoAntiguo.aforo_no_socios} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="voluntarios">Voluntarios necesarios</label>
                        <input type="number" name="voluntarios" required value={eventoAntiguo.voluntarios} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="imagen">Imágenes</label>
                        <input type="text" name="imagen" required value={eventoAntiguo.imagen} onChange={handleChange} />
                    </div>
                    <div>
                        <button type="submit" className="botonAzul">Crear Evento</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CambiarEvento;