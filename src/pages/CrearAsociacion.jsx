
export default function CrearAsociacion() {

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                {/* <form method="POST" action="https://guillermo.informaticamajada.es/api/asociacion"> */}
                <form method="POST" action="http://platita.test/api/asociacion">
                    <h3>Crear Asociación</h3>
                    <div>
                        <label htmlFor="">Nombre</label><input name="nombre" type="text" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Descripción</label><input name="descripcion" type="text"  rows="5"   />
                    </div>
                    <div>
                        <label htmlFor="">Contacto</label><input name="contacto" type="number" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Email</label><input name="email" type="email" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Imagen</label><input className="imagen" name="imagen" type="file" placeholder="" />
                    </div>
                    <input type="hidden" name="gestor_id" value="1" /> 
                    <div>
                        <button type="submit" className="botonAzul">Crear Asociación</button>
                    </div>
                </form>
            </div>
        </div>
    )
}