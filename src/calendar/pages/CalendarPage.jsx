import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../components";
import { getMessagesES, localizer } from "../helpers";
import { useEffect, useState } from "react";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";


export const CalendarPage = () => {
  const { events, setCalendarEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("view") || "month"
    );
    const { user } = useAuthStore();
    
    const eventStyleGetter = (event, start, end) => {
      console.log(event, start, end )
    
      const isMyEvent = ( user.id === event.user.id ) || ( user.id === event.user._id );
    
      const style = {
        backgroundColor: isMyEvent ? "#1e0922" : "#120992",
        opacity: 0.6,
        borderRadius: "0px 20px 20px 0px",
        padding: 5,
      };
    
      return {
        style,
      };
    };

  const onDoubleClick = () => {
    openDateModal();
  };
  const onSelect = (event) => {
    setCalendarEvent(event);
  };
  const onViewChanged = (event) => {
    localStorage.setItem("view", event);
    console.log({ viewChanged: event });
  };

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px) " }} // tomas el tomar el view height y le restas el alto del navbar
        messages={getMessagesES}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
