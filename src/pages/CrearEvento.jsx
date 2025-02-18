import { useFetch } from "../hooks/useFetch";
import axios from "axios";

export default function CrearEvento() {
    const { data, loading, error } = useFetch("http://platita.test/api/evento");
    console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("¿Estás seguro de que quieres crear este producto?")) return;

        // Crear un objeto FormData a partir del formulario
        const formData = new FormData(e.target);

        // Convertir FormData a un objeto plano
        const nuevoEvento = Object.fromEntries(formData.entries());

        console.log(nuevoEvento); // Muestra el objeto con los datos del formulario

        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("http://platita.test/api/evento", nuevoEvento, { withCredentials: true });
            alert("Producto creado correctamente");
        } catch (error) {
            console.error("Error creando el producto:", error);
        }
    };

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                {/* 
                nombre
                descripcion
                tipo
                fecha_inicio
                fecha_fin
                accesibilidad
                estado
                aforo
                aforo_socios
                aforo_no_socios
                voluntarios
                imagen
                */}
                {/* https://guillermo.informaticamajada.es/api/evento */}
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
                        <label htmlFor="voluntarios">Voluntarios necesarios</label>
                        <input type="number" name="voluntarios" required />
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