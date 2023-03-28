import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';


import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es)

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { closeDateModal } = useUiStore()
  const { activeCalendarEvent, startSavingCalendarNote } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();
  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const onCloseModal = () => {
    console.log("modal closed");
    closeDateModal()
  };

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';

    return( formValues.title.length > 0
      ? 'is-valid'
      : 'is-invalid' 
    );

  }, [ formValues.title, formSubmitted ])

  useEffect(() => {
    // cuanda recien cargas la aplicacion, fijarse de no actualizar el formulario con valores null
    if( activeCalendarEvent !== null ) {
      // romper la reactividad, generando nuevo objecto
      setFormValues({ ...activeCalendarEvent });
    }
  }, [ activeCalendarEvent ]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)

    const difference = differenceInSeconds( formValues.end, formValues.start);
    console.log( difference );
    if( isNaN( difference ) || difference <= 0 ) {
      Swal.fire("Las fechas no cuadran", 'Arreglalas', 'error');
      return;
    }

    if( formValues.title.length <= 0 ) return;

    console.log("form submitted");

    //TODO:
    startSavingCalendarNote( formValues )
    closeDateModal();
    setFormSubmitted( false );
    // CERRAR MODAL
    // LIMPIART ERRORES DE CONSOLA

  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            selected={formValues.start}
            className="form-control"
            name="start"
            onChange={(event) => onDateChanged(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <ReactDatePicker
            minDate={ formValues.start }
            selected={formValues.end }
            className="form-control"
            name="start"
            onChange={(event) => onDateChanged(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ titleClass }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className={`form-control ${ titleClass }`} 
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
