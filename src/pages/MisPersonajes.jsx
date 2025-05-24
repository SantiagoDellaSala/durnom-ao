import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './misPersonajes.css';

function MisPersonajes() {
  const { user } = useAuth();
  const [personajes, setPersonajes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchPersonajes();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchPersonajes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/personajes/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPersonajes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCrear = () => {
    if (personajes.length >= 6) {
      alert('Ya tienes 6 personajes, no puedes crear más.');
      return;
    }
    navigate('/crear-personaje');
  };

  const handleVolver = () => navigate('/');

  const handleConectar = () => alert('Funcionalidad aún no implementada');

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este personaje?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/personajes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPersonajes();
    } catch (err) {
      alert('Error al eliminar personaje');
      console.error(err);
    }
  };

  return (
    <div className="mis-personajes">
      <h1 className="titulo">Tus Personajes</h1>
      <div className="grid">
        {Array.from({ length: 6 }).map((_, i) => {
          const personaje = personajes[i];
          return (
            <div className="slot" key={i}>
              {personaje ? (
                <div>
                  <h3>{personaje.nick_name}</h3>
                  <p>Nivel: {personaje.nivel}</p>
                  <p><strong>Bando:</strong> {personaje.Bando?.nombre || 'N/A'}</p>
                  <p><strong>Clase:</strong> {personaje.Clase?.nombre || 'N/A'}</p>
                  <p><strong>Raza:</strong> {personaje.Raza?.nombre || 'N/A'}</p>
                  <button onClick={() => handleEliminar(personaje.id)} className="btn-eliminar">Eliminar</button>
                </div>
              ) : (
                <p className="vacante">Vacío</p>
              )}
            </div>
          );
        })}
      </div>
      <nav className="navbar">
        <button onClick={handleCrear}>Crear</button>
        <button onClick={handleConectar}>Conectar</button>
        <button onClick={handleVolver}>Volver</button>
      </nav>
    </div>
  );
}

export default MisPersonajes;
