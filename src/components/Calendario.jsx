
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


export default function Calendario({eventos}) {

    console.log(eventos);


    const eventsService = useState(() => createEventsServicePlugin())[0]

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), 
            // createViewDay(), createViewWeek(), createViewMonthAgenda()

        ],
        events: eventos,
        plugins: [eventsService]
    })


    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

