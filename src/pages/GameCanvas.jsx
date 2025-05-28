import { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TILE_SIZE = 32;
const MAP_WIDTH = 100;
const MAP_HEIGHT = 100;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

function GameCanvas() {
  const { personajeConectado } = useGame();
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [pos, setPos] = useState(() => ({
    x: personajeConectado?.posX ?? 50,
    y: personajeConectado?.posY ?? 50,
  }));

  useEffect(() => {
    if (!personajeConectado) {
      navigate('/personajes');
      return;
    }

    const handleKeyDown = (e) => {
      setPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === 'ArrowUp') newY = Math.max(0, prev.y - 1);
        if (e.key === 'ArrowDown') newY = Math.min(MAP_HEIGHT - 1, prev.y + 1);
        if (e.key === 'ArrowLeft') newX = Math.max(0, prev.x - 1);
        if (e.key === 'ArrowRight') newX = Math.min(MAP_WIDTH - 1, prev.x + 1);

        if (newX !== prev.x || newY !== prev.y) {
          axios
            .put(`http://localhost:3000/api/personajes/${personajeConectado.id}/posicion`, {
              posX: newX,
              posY: newY,
            })
            .catch((err) => {
              console.error('Error al actualizar la posición', err);
            });
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, personajeConectado]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const offsetX = pos.x * TILE_SIZE - CANVAS_WIDTH / 2 + TILE_SIZE / 2;
    const offsetY = pos.y * TILE_SIZE - CANVAS_HEIGHT / 2 + TILE_SIZE / 2;

    const tilesInViewX = Math.ceil(CANVAS_WIDTH / TILE_SIZE);
    const tilesInViewY = Math.ceil(CANVAS_HEIGHT / TILE_SIZE);

    const startX = Math.max(0, Math.floor(offsetX / TILE_SIZE));
    const startY = Math.max(0, Math.floor(offsetY / TILE_SIZE));
    const endX = Math.min(MAP_WIDTH, startX + tilesInViewX + 2);
    const endY = Math.min(MAP_HEIGHT, startY + tilesInViewY + 2);

    ctx.fillStyle = '#111';
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        ctx.strokeStyle = '#333';
        ctx.strokeRect(
          x * TILE_SIZE - offsetX,
          y * TILE_SIZE - offsetY,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }

    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fill();
  }, [pos]);

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2>Juego - {personajeConectado?.nick_name}</h2>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: '0.2px solid grey', backgroundColor: 'black' }}
      />
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        Posición actual: ({pos.x}, {pos.y}, {personajeConectado?.mapa}) 
      </div>
    </div>
  );
}

export default GameCanvas;
