import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookLoan = () => {
  const { bookId } = useParams(); // Obtener bookId de la URL
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleLoan = async () => {
    try {
      const response = await axios.post('/api/prestamos', {
        id_libro: bookId, // Usar bookId
        id_usuario: userId,
        fecha_prestamo: new Date(),
        fecha_devolucion: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días después
        estado: 'activo',
      });

      if (response.status === 200) {
        setMessage('Préstamo registrado con éxito.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al registrar el préstamo.');
    }
  };

  return (
    <div>
      <h2>Solicitar Préstamo para Libro ID: {bookId}</h2>
      <input
        type="text"
        placeholder="ID del usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleLoan}>Solicitar Préstamo</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookLoan;
