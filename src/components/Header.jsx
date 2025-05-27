import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="nav">
        <div>
          <Link to="/" className="logo">
  Durnom <span style={{ color: 'red' }}>A</span><span style={{ color: 'blue' }}>O</span>
</Link>

        </div>
        <div>
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
