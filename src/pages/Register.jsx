import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    mail: '',
    password: '',
    codigo_seguridad: ''
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      localStorage.setItem('token', data.token);
      login(data.user);

      setMensaje('Registro exitoso. Redirigiendo...');
      setTimeout(() => navigate('/personajes'), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="register-container">
      <div className="register-box">
        <Link to="/" className="btn-back">← Volver</Link>
        <h2 className="register-title">Registrarse</h2>

        {mensaje && <p className="mensaje">{mensaje}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Correo</label>
            <input
              type="email"
              name="mail"
              value={form.mail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Código de seguridad</label>
            <input
              type="text"
              name="codigo_seguridad"
              value={form.codigo_seguridad}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-button">Registrarse</button>
        </form>
      </div>
    </main>
  );
};

export default Register;
