
export default function CrearAsociacion() {

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                <form method="POST" action="https://guillermo.informaticamajada.es/api/asociacion">
                    <h3>Crear Asociación</h3>
                    <div>
                        <label htmlFor="">Título</label><input type="text" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Descripción</label><input type="text"  rows="5"   />
                    </div>
                    <div>
                        <label htmlFor="">Contacto</label><input type="number" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Email</label><input type="email" placeholder="" />
                    </div>
                    <div>
                        <button type="submit" className="botonAzul">Crear Asociación</button>
                    </div>
                </form>
            </div>
        </div>
    )
}