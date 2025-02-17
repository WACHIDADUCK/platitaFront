export default function CrearEvento() {

    return (
        <div className="crearAsociacion flex-center">
            <div className="crearAsociacionForm">
                {/* https://guillermo.informaticamajada.es/api/evento */}

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
                <form method="POST" action="http://platita.test/api/evento">
                    <h3>Crear Evento</h3>
                    <div>
                        <label htmlFor="">Título</label><input type="text" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Descripción</label><input type="text" rows="5" />
                    </div>
                    <div>
                        <label htmlFor="">Contacto</label><input type="number" placeholder="" />
                    </div>
                    <div>
                        <label htmlFor="">Email</label><input type="email" placeholder="" />
                    </div>
                    <div>
                        <button type="submit" className="botonAzul">Crear Evento</button>
                    </div>
                </form>
            </div>
        </div>
    )
}