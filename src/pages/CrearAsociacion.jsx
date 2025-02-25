import axios from "../hooks/axios";
import { Link } from "react-router-dom";
import { useProvider } from '../providers/ContextProvider';


export default function CrearAsociacion() {

    const { state } = useProvider();
    console.log(state.url);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("¿Estás seguro de que quieres crear esta asociación?")) return;

        // Crear un objeto FormData a partir del formulario
        const formData = new FormData(e.target);

        // Convertir FormData a un objeto plano
        const nuevaAsociacion = Object.fromEntries(formData.entries());
        nuevaAsociacion.contacto = parseFloat(nuevaAsociacion.contacto);

        // console.log(nuevaAsociacion); // Muestra el objeto con los datos del formulario

        try {

            await axios.get(`${state.url}/sanctum/csrf-cookie`);
            await axios.post(`${state.url}/api/asociacion`, nuevaAsociacion);
            alert("Asociación creada correctamente");
            window.location.href = '/asociaciones';
        } catch (error) {
            console.error("Error creando la asociación:", error);
        }
    };

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                <form method="POST" onSubmit={handleSubmit}>
                    <h3>Crear Asociación</h3>
                    <div>
                        <label htmlFor="">Nombre</label><input name="nombre" type="text" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Descripción</label><input name="descripcion" type="text" rows="5" />
                    </div>
                    <div>
                        <label htmlFor="">Contacto</label><input name="contacto" type="number" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Email</label><input name="email" type="email" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Imagen</label><input className="imagen" name="imagen" type="text" placeholder="" />
                        {/* type="file" */}
                    </div>
                    <input type="hidden" name="gestor_id" value="2" />
                    <div>
                        <Link type="submit" className="botonAzul">Crear Asociación</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}