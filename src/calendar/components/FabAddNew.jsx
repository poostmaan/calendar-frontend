import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setCalendarEvent } =  useCalendarStore();

    const handleClick = () => {
        setCalendarEvent({
            title: "Nuevo Evento",
            notes: "",
            start: new Date(),
            end: addHours( new Date(), 1 ),
            bgColor: "#fafafa",
            user: {
                _id: "123923",
                name: "Louis"
            }
        })
        openDateModal()
    }

  return (
    <button 
        className="btn btn-primary fab"
        onClick={ handleClick }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
