import { useAuthStore } from "../../hooks";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">
          <i className="fas fa-calendar-alt"></i>
          {user.nombre}
        </span>

        <button className="btn btn-outline-danger" onClick={ startLogout }>Salir</button>
      </nav>
    </>
  );
};
