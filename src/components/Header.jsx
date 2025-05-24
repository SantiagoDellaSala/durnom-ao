import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ backgroundColor: '#222', padding: '1rem', color: 'white' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Durnom
          </Link>
        </div>
        <div>
          {!user ? (
            <>
              <Link to="/login" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>
                Iniciar sesión
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <span style={{ marginRight: '1rem' }}>Hola, {user.mail}</span>
              <button
                onClick={logout}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  color: 'white',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
