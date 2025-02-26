import axios from "../hooks/axios";
import { Link } from "react-router-dom";
import { useProvider } from '../providers/ContextProvider';


export default function CrearAsociacion() {

    const { state } = useProvider();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("¿Estás seguro de que quieres crear esta asociación?")) return;

        console.log("Formulario")
        // Crear un objeto FormData a partir del formulario
        const formData = new FormData(e.target);

        // Convertir FormData a un objeto plano
        const nuevaAsociacion = Object.fromEntries(formData.entries());

        console.log(nuevaAsociacion);
        // console.log(nuevaAsociacion); // Muestra el objeto con los datos del formulario

        try {
            await axios.get(`sanctum/csrf-cookie`);
            await axios.post(`api/asociacion`, nuevaAsociacion);
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
                        <label htmlFor="">Contacto</label><input name="contacto" type="text" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Email</label><input name="email" type="email" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Imagen</label><input className="imagen" name="imagen" type="text" placeholder="" />
                        {/* type="file" */}
                    </div>
                    <input type="hidden" name="gestor_id" value={idUser} />
                    <div>
                        <button type="submit" className="botonAzul">Crear Asociación</button>
                    </div>
                </form>
            </div>
        </div>
    )
}