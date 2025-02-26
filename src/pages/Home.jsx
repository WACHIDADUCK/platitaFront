
// import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar';
// import {
//     createViewDay,
//     createViewMonthAgenda,
//     createViewMonthGrid,
//     createViewWeek,
// } from '@schedule-x/calendar'
// import { createEventsServicePlugin } from '@schedule-x/events-service'
// import { useEffect, useState } from "react";

// import '@schedule-x/theme-default/dist/index.css'

export default function Home() {
//     const eventsService = useState(() => createEventsServicePlugin())[0]

//     const calendar = useCalendarApp({
//         views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
//         events: [
//             {
//                 id: '1',
//                 title: 'Event 1',
//                 start: '2023-12-16',
//                 end: '2023-12-16',
//             },
//         ],
//         plugins: [eventsService]
//     })

//     useEffect(() => {
//         // get all events
//         eventsService.getAll()
//     }, [])

return (
    <div>
        <h1>Home</h1>
        {/* <ScheduleXCalendar calendarApp={calendar} /> */}
    </div>
)
}

