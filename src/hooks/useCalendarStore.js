import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertStringDate } from "../helpers/convertStringDate";
import { 
  addNewCalendarEvent, 
  onDeleteEvent, 
  onLoadEvents, 
  onSetActiveCalendarEvent,
  updateCalendarEvent,
 } from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeCalendarEvent } = useSelector(
    (state) => state.calendar
  );

  const { user } = useSelector( state => state.auth );

  const startSavingCalendarNote = async(calendarEvent) => {
    try {
      
      if(calendarEvent.id) {
        
        await calendarApi.put(`/eventos/${ calendarEvent.id }`, calendarEvent);
        dispatch(updateCalendarEvent({...calendarEvent}))
        return;
  
      } 
  
      const {data} = await calendarApi.post('/eventos', calendarEvent);
      dispatch(addNewCalendarEvent({...calendarEvent, id: data.data.eventoGuardado.id, user}));
      
    } catch (error) {
      Swal.fire('Algo salio mal :(', "", "error");
    }
    
  };

  const startDeletingCalendarEvent = async() => { 
    if( activeCalendarEvent === null ) {
      Swal.fire("", "Selecciona un evento", "error")
      return;
    }

    try {
      await calendarApi.delete(`/eventos/${ activeCalendarEvent.id }`);
      dispatch( onDeleteEvent() ) 
    } catch (error) {
      Swal.fire("", "No se pudo eliminar", "error")
      return;
    } 

  }

  const setCalendarEvent = (calendarEvent) => {
    dispatch(onSetActiveCalendarEvent( calendarEvent ));
  };

  const startLoadingEvents = async() => { 
    const {data} = await calendarApi.get('/eventos');
    const eventos = convertStringDate( data.data.eventos );
    dispatch(onLoadEvents(eventos));
    console.log(eventos)
  }

  return {
    // ? Propiedades
    events,
    activeCalendarEvent,
    hasEventSelected: !!activeCalendarEvent,
    // ? Metodos
    setCalendarEvent,
    startDeletingCalendarEvent,
    startLoadingEvents,
    startSavingCalendarNote,
  };
};
