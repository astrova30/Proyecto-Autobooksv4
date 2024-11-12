import React, { useState } from 'react';
import axios from 'axios';

const BookReturn = ({ bookId }) => {
  const [message, setMessage] = useState('');

  const handleReturn = async () => {
    try {
      // Actualizar el estado del préstamo a 'devuelto'
      const response = await axios.put(`/api/prestamos/return/${bookId}`, {
        estado: 'devuelto',
        fecha_devolucion: new Date(),
      });

      if (response.status === 200) {
        // Actualizar el estado del libro a 'disponible'
        await axios.put(`/api/libros/${bookId}`, {
          estado: 'disponible',
        });

        setMessage('Devolución registrada con éxito.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al registrar la devolución.');
    }
  };

  return (
    <div>
      <button onClick={handleReturn}>Devolver Libro</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookReturn;
