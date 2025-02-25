import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function ListaEventosAside({ eventos, cabecero }) {

    return (
        <div className="asideDiv asideDivEventos ">
            <h4 className="naranja">{cabecero}</h4>
            {
                eventos.map(evento => {
                    return (
                        <Link to={`/evento/${evento.id}`} key={evento.id} className="misAsociacionesContainer">
                            <div>
                                <div>
                                    <img src={evento.imagen} alt={evento.nombre} className="" />
                                </div>
                                <div>
                                    <h3>{evento.nombre}</h3>
                                    <div className="asociacionInfo">
                                        <div className="evento-fecha-hora">
                                            <strong> {format(new Date(evento.fecha_inicio), "dd 'de' MMM, yyyy", { locale: es })}</strong>
                                            <strong> {format(new Date(evento.fecha_inicio), " h:mm a", { locale: es })}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}