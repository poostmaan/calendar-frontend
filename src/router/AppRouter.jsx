import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthenticationPage } from "../auth"
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { statuses } from "../store/auth/statuses";

export const AppRouter = () => {

    // const authState = "non-authenticated";
    const authState = "checking";

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, [])

  if( status === statuses.checking ) {
    return <h3> Cargando... </h3>
  }

  return (
    <>
    
        <Routes>

            {
                ( status === statuses.notAuthenticated ) 
                    ? (
                      <>
                        <Route path="/auth/*" element={ <AuthenticationPage />} />
                        <Route path="/*" element={ <Navigate to="/auth/login" />} /> 
                      </>
                    ) 
                    : (
                      <>
                        <Route path="/" element={ <CalendarPage />} />
                        <Route path="/*" element={ <Navigate to="/" />} /> 
                      </>
                    ) 
            }

            <Route path="/*" element={ <Navigate to="/auth/*" /> } />

        </Routes>
    
    </>
  )
}
