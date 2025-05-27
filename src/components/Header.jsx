import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div>
          <Link to="/" className="logo">
            Durnom <span style={{ color: 'red' }}>A</span><span style={{ color: 'blue' }}>O</span>
          </Link>
        </div>
        <div className="nav-right">
          {user && location.pathname !== '/personajes' && (
            <Link to="/personajes" className="nav-link">Mis Personajes</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Iniciar sesión</Link>
              <Link to="/register" className="nav-link">Registrarse</Link>
            </>
          ) : (
            <>
              <span className="user-mail">Hola, {user.mail}</span>
              <button className="logout-btn" onClick={logout}>Cerrar sesión</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
