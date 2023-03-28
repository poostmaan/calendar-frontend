import { useCalendarStore } from "../../hooks"


export const FabDelete = () => {

    const { startDeletingCalendarEvent, hasEventSelected } = useCalendarStore();

    const handleClick = () => {
        startDeletingCalendarEvent();
    }

  return ( 
    <button 
        className={`btn btn-danger fab-delete ${ hasEventSelected ? 'animate__animated animate__fadeIn' : '' }`}
        onClick={ handleClick }
        style={{
            display: hasEventSelected ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
