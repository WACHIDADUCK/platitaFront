import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { useEffect, useState } from "react";
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import '../styles/calendar.css';
import { useProvider } from '../providers/ContextProvider';
import Calendario from '../components/Calendario';
import Claudinary from '../components/Claudinary';


export default function Home() {

    const { state, filtrarEventosAcreditados } = useProvider();
    const [eventos, setEventos] = useState([]);

    const ev2 = eventos ? eventos : [];

    useEffect(() => {
        if (state.eventos) {
            const e = filtrarEventosAcreditados().map(e => ({
                id: e.id.toString(),
                title: e.nombre,
                start: e.fecha_inicio.split('T')[0],
                end: e.fecha_fin.split('T')[0],
            }));

            setEventos(e);
        }

    }, [state.eventos]);  // Asegúrate de que state.eventos esté en las dependencias

    return (
        <div>
            {/* <Claudinary /> */}
            {ev2[0] && <Calendario eventos={ev2} />}
        </div>
    )
}

