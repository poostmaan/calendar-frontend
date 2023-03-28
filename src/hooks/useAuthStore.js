import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async({ email, password }) => { 
    console.log(email, password)
    dispatch( onChecking );
    try {
      const { data } = await calendarApi.post('/auth', { correo: email, clave: password })
      const { token, nombre, id } = data.data
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ nombre, id }) )

    } catch (error) {
  
      // ! EL ERROR QUE MANDAMOS DESDE NUESTRO BACKEND ESTARA EN 
      // * RESPONSE.DATA
      dispatch( onLogout("Credenciales Invalidas") );
      setTimeout(() => {
        dispatch( clearErrorMessage )
      }, 10);
    }
  }

  const startRegister = async({  registerName, registerEmail, registerPassword }) => { 
    // console.log(email, nombre, password)
    dispatch( onChecking );

    try {
      // 
      const { data } = await calendarApi.post('/auth/new', { correo: registerEmail, clave: registerPassword, nombre: registerName })
      const { token, usuario, id } = data.data
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ usuario, id }) ) 

    } catch (error) {
      console.log({error})

      const { data } = error.response
      const message = data.message
      const inputs = data.data.map(e => e.msg).toString();

      dispatch( onLogout(`${message}: ${inputs}`) ); 

      setTimeout(() => {
        dispatch( clearErrorMessage )
      }, 10);

    }
  }

  const checkAuthToken = async() => {
    const token = sessionStorage.getItem('token');
    if(!token) return dispatch( onLogout() );

    try {
      // 
      const { data } = await calendarApi.post('/auth/renew', { token })
      const { token, nombre, id } = data.data
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ nombre, id }) ) 

    } catch (error) {
      sessionStorage.clear();
      dispatch( onLogout() ) 
    }
  }

  const startLogout = () => {
    sessionStorage.clear()
    dispatch( onLogoutCalendar() );
    dispatch( onLogout() );
  }


  return {
    // *  Propiedades
    errorMessage,
    status,
    user,

    // ! Metodos
    startLogin,
    startLogout,
    startRegister,
    checkAuthToken
  };
};
