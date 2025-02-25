import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function ListaEventos({ eventos }) {

    return (
        <div className="eventos-lista">
            {eventos?.map(evento => {
                return (
                    <div key={evento.id} className="evento-card">
                        <h2>{evento.nombre}</h2>
                        <div className="evento-info">
                            <img src={evento.imagen} alt={evento.nombre} className="evento-imagen" />
                            <div className="evento-fecha-hora">
                                <p>Desde<strong> {format(new Date(evento.fecha_inicio), "dd 'de' MMM, yyyy, h:mm a", { locale: es })}</strong> a {format(new Date(evento.fecha_fin), "dd 'de' MMM, yyyy, h:mm a", { locale: es })}</p>
                                <p>Lugar<strong> {evento.lugar}</strong></p>
                                <div className="evento-aforo">

                                    <p>Plazas restantes:</p>
                                    <div className='centrado'>
                                        <p>{evento.aforo_socios - evento.contador_aforo_socios} Socios </p><img src="./img/people.svg" alt="" className="icon" />
                                    </div>

                                    <div className='centrado'>
                                        <p>{evento.aforo_no_socios - evento.contador_aforo_no_socios} No Socios </p><img src="./img/people.svg" alt="" className="icon" />
                                    </div>

                                </div>
                                <div className="evento-aforo centrado">
                                    <p><strong>{evento.contador_aforo_socios + evento.contador_aforo_no_socios} Asistiran </strong></p><img src="./img/people.svg" alt="" className="icon" />
                                </div>
                            </div>
                            <Link className="link" to="/evento/1">Ver</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}