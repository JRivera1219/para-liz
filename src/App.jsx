import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, HeartHandshake, Gift, Calendar, Ticket } from 'lucide-react';

// ⚠️ Cambia esta fecha por la fecha en que iniciaron (Año, Mes - 1, Día)
// Nota: En JavaScript los meses van de 0 (Enero) a 11 (Diciembre)
const FECHA_INICIO = new Date(2023, 5, 15); // Ejemplo: 15 de Junio de 2023

const RAZONES = [
  "Tu sonrisa ilumina cualquier día gris.",
  "La forma en que te ríes de mis chistes.",
  "Lo inteligente y dedicada que eres en todo.",
  "Cómo me haces sentir en casa cada vez que estoy contigo.",
  "Tus abrazos son mi lugar favorito."
];

const MENSAJES_SORPRESA = [
  "Eres lo mejor que me ha pasado, Liz ❤️",
  "¿Ya te dijeron hoy lo increíble que te ves?",
  "Un recordatorio rápido: ¡Te amo muchísimo!",
  "Gracias por cada segundo a tu lado ✨",
  "Vales más que mil galaxias juntas 🌌"
];

const CUPONES = [
  "🎟️ Válido por una cena romántica",
  "🍦 Válido por un helado y una caminata",
  "🎬 Válido por una tarde de películas a tu elección",
  "💆‍♀️ Válido por un masaje relajante de 20 min"
];

export default function App() {
  const [razonActual, setRazonActual] = useState(0);
  const [mensajeSorpresa, setMensajeSorpresa] = useState('');
  const [cuponActual, setCuponActual] = useState(CUPONES[0]);
  const [diasJuntos, setDiasJuntos] = useState(0);

  useEffect(() => {
    const calcularDias = () => {
      const hoy = new Date();
      const diferenciaTiempo = Math.abs(hoy - FECHA_INICIO);
      const dias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
      setDiasJuntos(dias);
    };

    calcularDias();
  }, []);

  const lanzarCorazones = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#e63946', '#ff758c', '#ffb3c1']
      });
    } catch (e) {
      console.log(e);
    }

    const indexRandom = Math.floor(Math.random() * MENSAJES_SORPRESA.length);
    setMensajeSorpresa(MENSAJES_SORPRESA[indexRandom]);
  };

  const obtenerCupon = () => {
    const indexRandom = Math.floor(Math.random() * CUPONES.length);
    setCuponActual(CUPONES[indexRandom]);
  };

  return (
    <div className="mobile-container">
      <header className="header">
        <h1>Para Liz ❤️</h1>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>Una pequeña app hecha solo para ti</p>
      </header>

      {/* Contador de Tiempo */}
      <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #fff0f3, #ffe3e8)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Calendar color="#e63946" size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#e63946' }}>LLEVAMOS JUNTOS</span>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1d3557' }}>
          {diasJuntos} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>días</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: '#888' }}>y sumando cada segundo...</p>
      </div>

      {/* Razones por las que te quiero */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <HeartHandshake color="#e63946" size={20} />
          <h3 style={{ fontSize: '1.1rem', color: '#1d3557' }}>Razones por las que te quiero</h3>
        </div>
        <div className="reasons-grid">
          <div className="reason-item">
            <Heart color="#e63946" size={16} fill="#e63946" />
            <span>{RAZONES[razonActual]}</span>
          </div>
        </div>
        <button
          onClick={() => setRazonActual((prev) => (prev + 1) % RAZONES.length)}
          style={{
            marginTop: '12px',
            background: 'none',
            border: 'none',
            color: '#e63946',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Ver otra razón ➔
        </button>
      </div>

      {/* Cupones de Amor */}
      <div className="card" style={{ borderStyle: 'dashed', borderColor: '#e63946' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Ticket color="#e63946" size={20} />
          <h3 style={{ fontSize: '1rem', color: '#1d3557' }}>Cupón especial del día</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#c1121f', fontWeight: '500', margin: '8px 0' }}>
          {cuponActual}
        </p>
        <button
          onClick={obtenerCupon}
          style={{
            background: '#fff0f3',
            border: '1px solid #e63946',
            color: '#e63946',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Generar otro cupón 🎲
        </button>
      </div>

      {/* Botón Sorpresa */}
      <button className="btn-surprise" onClick={lanzarCorazones}>
        <Gift size={20} />
        ¡Toca para una sorpresa!
      </button>

      {mensajeSorpresa && (
        <div className="message-box">
          <p style={{ color: '#c1121f', fontWeight: '500' }}>{mensajeSorpresa}</p>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>
        Hecho con amor especialmente para ti
      </footer>
    </div>
  );
}
