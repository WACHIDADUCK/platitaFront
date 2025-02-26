import axios from "../hooks/axios";
import { useProvider } from '../providers/ContextProvider';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";



export default function CrearAsociacion() {

    const esGestor = useProvider().state.esGestor;

    const { state } = useProvider();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;

    console.log(state.url);

    const [asociacion, setAsociacion] = useState([]);

    const id = useParams().id;

    useEffect(() => {
        if (state?.asociaciones) setAsociacion(state.asociaciones.find(asociacion => asociacion.id == id));
    }, [state]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("¿Estás seguro de que quieres crear esta asociación?")) return;

        // Crear un objeto FormData a partir del formulario
        const formData = new FormData(e.target);

        // Convertir FormData a un objeto plano
        const nuevaAsociacion = Object.fromEntries(formData.entries());
        nuevaAsociacion.contacto = parseFloat(nuevaAsociacion.contacto);


        try {
            await axios.get(`sanctum/csrf-cookie`);
            await axios.put(`api/asociacion/${id}`, nuevaAsociacion);
            alert("Asociación actualizada correctamente");
            window.location.href = `/asociacion/${id}`;
        } catch (error) {
            console.error("Error creando la asociación:", error);
        }
    };


    const [datos, setDatos] = useState({});

    useEffect(() => {
        if (state?.asociaciones) setAsociacion(state.asociaciones.find(asociacion => asociacion.id == id));
        setDatos({
            nombre: asociacion?.nombre,
            descripcion: asociacion?.descripcion,
            contacto: asociacion?.contacto,
            email: asociacion?.email
        });
    }, [state]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAsociacion({
            ...asociacion,
            [name]: value
        });
    };

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                <form method="POST" onSubmit={handleSubmit}>
                    <h3>Crear Asociación</h3>
                    <div>
                        <label htmlFor="">Nombre</label>
                        <input
                            name="nombre"
                            type="text"
                            placeholder=""
                            value={asociacion?.nombre || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Descripción</label>
                        <input
                            name="descripcion"
                            type="text"
                            rows="5"
                            value={asociacion?.descripcion || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Contacto</label>
                        <input
                            name="contacto"
                            type="number"
                            placeholder=""
                            value={asociacion?.contacto || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder=""
                            value={asociacion?.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Imagen</label>
                        <input
                            className="imagen"
                            name="imagen"
                            type="text"
                            placeholder=""
                            value={asociacion?.imagen || ''}
                            onChange={handleInputChange}
                        />
                        {/* type="file" */}
                    </div>
                    <input type="hidden" name="gestor_id" value="2" />
                    <div>
                        <button type="submit" className="botonAzul">Editar Asociación</button>
                    </div>
                </form>
            </div>
        </div>
    )
}