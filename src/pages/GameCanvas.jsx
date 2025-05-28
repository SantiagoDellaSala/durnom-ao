// src/pages/GameCanvas.jsx
import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

function GameCanvas() {
  const { personajeConectado } = useGame();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!personajeConectado) {
      // Si no hay personaje conectado, volvemos a personajes
      navigate('/personajes');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar fondo (puedes personalizar)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar personaje como punto rojo
    ctx.fillStyle = 'red';
    // Ajustamos un poco las coordenadas para que se vean bien en canvas (ej: escala 1:1)
    ctx.beginPath();
    ctx.arc(personajeConectado.posX, personajeConectado.posY, 10, 0, Math.PI * 2);
    ctx.fill();
  }, [personajeConectado, navigate]);

  return (
    <div>
      <h2>Juego - Personaje: {personajeConectado?.nick_name}</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid white', backgroundColor: 'black' }}
      />
    </div>
  );
}

export default GameCanvas;
