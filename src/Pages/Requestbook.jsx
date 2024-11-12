import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const RequestBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar la lista de libros desde tu backend
    Axios.get('http://localhost:3000/books') 
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los libros:', error);
      });
  }, []);

  const handleRequestBook = () => {
    if (!selectedBook) {
      setMessage('Por favor selecciona un libro.');
      return;
    }

    // Realiza la solicitud para pedir el libro prestado
    Axios.post('http://localhost:3000/request-book', {
      bookId: selectedBook.idLibro, // Ajusta según la estructura de tu libro
      userId: 1 // Asumiendo que el ID de Laura es 1
    })
      .then(() => {
        setMessage('El libro ha sido solicitado con éxito.');
        setSelectedBook(null); // Reinicia la selección
      })
      .catch((error) => {
        console.error('Error al solicitar el libro:', error);
        setMessage('Hubo un error al solicitar el libro. Intenta de nuevo.');
      });
  };

  return (
    <div>
      <h2>Solicitar un Libro</h2>
      <select onChange={(e) => setSelectedBook(books.find(b => b.idLibro === parseInt(e.target.value)))}>
        <option value="">Selecciona un libro</option>
        {books.map((book) => (
          <option key={book.idLibro} value={book.idLibro}>
            {book.titulo}
          </option>
        ))}
      </select>
      <button onClick={handleRequestBook}>Solicitar Libro</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestBook;
