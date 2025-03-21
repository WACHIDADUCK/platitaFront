import axios from "../../hooks/axios";
import { useNavigate } from "react-router-dom";

export default function CrearEvento() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const idUser = user ? user.id : null;
        const navigate = useNavigate();

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
            await axios.post("/api/evento", nuevoEvento);
            alert("Evento creado correctamente");
            navigate('/eventos');
        } catch (error) {
            console.error("Error creando el evento:", error);
        }
    };

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                <form method="POST" onSubmit={handleSubmit}>
                    <h3>Crear Evento</h3>
                    <div>
                        <label htmlFor="nombre">Título</label>
                        <input type="text" placeholder="" name="nombre" required />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text" rows="5" name="descripcion" required />
                    </div>
                    <div>
                        <label htmlFor="lugar">Lugar</label>
                        <input type="text" placeholder="" name="lugar" required />
                    </div>
                    <div>
                        <label htmlFor="tipo">Tipo</label>
                        <select name="tipo">
                            <option value="evento">evento</option>
                            <option value="actividad">actividad</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                        <input type="datetime-local" name="fecha_inicio" required />
                    </div>
                    <div>
                        <label htmlFor="fecha_fin">Fecha de Finalización</label>
                        <input type="datetime-local" name="fecha_fin" required />
                    </div>
                    <div>
                        <label htmlFor="accesibilidad">Accesibilidad</label>
                        <select name="accesibilidad">
                            <option value="socios">socios</option>
                            <option value="publico">publico</option>
                            <option value="privado">privado</option>
                            <option value="mixto">mixto</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="estado">Estado</label>
                        <select name="estado">
                            <option value="abierto">abierto</option>
                            <option value="cerrado">cerrado</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="aforo">Aforo total</label>
                        <input type="number" name="aforo" required />
                    </div>
                    <div>
                        <label htmlFor="aforo_socios">Aforo de socios</label>
                        <input type="number" name="aforo_socios" required />
                    </div>
                    <div>
                        <label htmlFor="aforo_no_socios">Aforo de invitados</label>
                        <input type="number" name="aforo_no_socios" required />
                    </div>
                    <div>
                        <label htmlFor="aforo_voluntarios">Voluntarios necesarios</label>
                        <input type="number" name="aforo_voluntarios" required />
                    </div>
                    <div>
                        <label htmlFor="imagen">Imágenes</label>
                        <input type="text" name="imagen" required />
                    </div>
                    <div>
                        <button type="submit" className="botonAzul">Crear Evento</button>
                    </div>
                </form>
            </div>
        </div>
    )
}