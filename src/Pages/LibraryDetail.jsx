import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import allbooks from '../Components/Assets/all_books';
import '../Pages/CSS/LibraryDetail.css';
import { useAuthorization } from '../Context/AuthContext';
import axios from 'axios';

const LibraryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const libro = allbooks.find((book) => book.id === parseInt(id));
  const { isAuthenticated, user } = useAuthorization(); // Obtener el usuario autenticado
  const [requestStatus, setRequestStatus] = useState('');

  if (!libro) {
    return <div className="not-found">Libro no encontrado</div>;
  }

  const handleRequestLoan = async () => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige a inicio de sesión si no está autenticado
    } else {
      try {
        const response = await axios.post('http://localhost:3001/api/loan-requests', {
          userId: user.id,  // ID del usuario autenticado
          bookId: libro.id, // ID del libro que se está solicitando
        });
        setRequestStatus(response.data.mensaje || `Solicitud de préstamo enviada para el libro: ${libro.titulo}`);
      } catch (error) {
        console.error("Error al enviar la solicitud de préstamo:", error);
        setRequestStatus("Error al enviar la solicitud de préstamo. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="library-detail-container">
      <div className="book-cover">
        <img src={libro.cover} alt={libro.titulo} />
      </div>
      <div className="book-info">
        <h1>{libro.titulo}</h1>
        <h2>{libro.autor}</h2>
        <p><strong>Editorial:</strong> {libro.editorial}</p>
        <p><strong>Año de publicación:</strong> {libro.fechaPublicacion}</p>
        <p><strong>Categoría:</strong> {libro.categoria}</p>
        <p><strong>Descripción:</strong> {libro.descripcion}</p>
        <p><strong>Tema:</strong> {libro.tema}</p>
        <p><strong>Ubicación:</strong> {libro.ubicacion}</p>
        <button className="borrow-book-button" onClick={handleRequestLoan}>
          Solicitar Préstamo
        </button>
        {requestStatus && <p className="request-status">{requestStatus}</p>}
      </div>
    </div>
  );
};

export default LibraryDetail;
