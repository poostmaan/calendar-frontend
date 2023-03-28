import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns/esm';

const tempEvent = {
    _id: new Date().getTime(),
    title: "Tarea rect",
    notes: "Termina esa verg",
    start: addHours( new Date(), 2 ),
    end: addHours( new Date(), 1 ),
    bgColor: "#fafafa",
    user: {
      _id: "123923",
      name: "Louis"
    }
}

export const calendatSlice = createSlice({
    name: 'calendat',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeCalendarEvent: null
    },
    reducers: {
        addNewCalendarEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeCalendarEvent = null;
        },
        updateCalendarEvent: (state, {payload}) => {
            const calendarEventIndex = state.events.findIndex(
                (calendarEvent) => calendarEvent._id === payload._id
            );

            state.events[calendarEventIndex] = payload;
        },
        onSetActiveCalendarEvent: ( state, { payload }) => {
            state.activeCalendarEvent = payload;
        },
        onDeleteEvent: ( state ) => {
            state.events = state.events.filter(
                calendarEvent => calendarEvent._id !== state.activeCalendarEvent._id
            );
            state.activeCalendarEvent = null;
        },
        onLoadEvents: ( state, { payload } ) => {
            state.isLoadingEvents = false;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id);
                if( !exists ) {
                    state.events.push(event)
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeCalendarEvent = null
        }
    }
});

export const { 
    addNewCalendarEvent, 
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveCalendarEvent,
    updateCalendarEvent,
} = calendatSlice.actions; 