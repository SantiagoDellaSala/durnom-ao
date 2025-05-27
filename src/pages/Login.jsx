import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { mail, password });
      login(res.data.user);
      localStorage.setItem('token', res.data.token);
      navigate('/personajes');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <Link to="/" className="btn-back">← Volver</Link> {/* Botón volver */}
        <h1 className="login-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Mail:</label>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
