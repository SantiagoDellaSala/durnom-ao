import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './CrearPersonaje.css';

function CrearPersonaje() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nick_name: '',
    bandoId: '',
    claseId: '',
    razaId: '',
  });

  const [bandos, setBandos] = useState([]);
  const [clases, setClases] = useState([]);
  const [razas, setRazas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [personajesCount, setPersonajesCount] = useState(0);

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const [resBandos, resClases, resRazas, resPersonajes] = await Promise.all([
          axios.get('http://localhost:3000/api/bandos'),
          axios.get('http://localhost:3000/api/clases'),
          axios.get('http://localhost:3000/api/razas'),
          axios.get(`http://localhost:3000/api/personajes/user/${user.id}`)
        ]);
        setBandos(resBandos.data);
        setClases(resClases.data);
        setRazas(resRazas.data);
        setPersonajesCount(resPersonajes.data.length);
      } catch (err) {
        console.error(err);
        setError('Error al cargar opciones');
      } finally {
        setLoading(false);
      }
    };
    fetchOpciones();
  }, [user.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (personajesCount >= 6) {
      setError('Ya tienes 6 personajes, no puedes crear más.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/personajes', {
        ...form,
        userId: user.id,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/personajes');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear personaje');
    }
  };

  if (loading) return <p className="loading-text">Cargando opciones...</p>;

  return (
    <main className="crear-container">
      <div className="crear-box">
        <Link to="/personajes" className="btn-back">← Volver</Link>
        <h1 className="crear-title">Crear Personaje</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="crear-form">
          <div className="form-group">
            <label>Nick Name:</label>
            <input
              type="text"
              name="nick_name"
              value={form.nick_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Bando:</label>
            <select name="bandoId" value={form.bandoId} onChange={handleChange} required>
              <option value="">Seleccione un bando</option>
              {bandos.map(b => (
                <option key={b.id} value={b.id}>{b.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Clase:</label>
            <select name="claseId" value={form.claseId} onChange={handleChange} required>
              <option value="">Seleccione una clase</option>
              {clases.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Raza:</label>
            <select name="razaId" value={form.razaId} onChange={handleChange} required>
              <option value="">Seleccione una raza</option>
              {razas.map(r => (
                <option key={r.id} value={r.id}>{r.nombre}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="crear-button">Crear</button>
        </form>
      </div>
    </main>
  );
}

export default CrearPersonaje;
