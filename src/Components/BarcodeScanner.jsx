import React, { useState } from 'react';
import '../Pages/CSS/BarcodeScanner.css'; 
import allBooks from './Assets/all_books'; 

const BarcodeScanner = () => {
  const [book, setBook] = useState(null);
  const [barcode, setBarcode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [documentNumber, setDocumentNumber] = useState('');
  const [isDocumentEntered, setIsDocumentEntered] = useState(false);
  const [prestamos, setPrestamos] = useState([]); 
  const usuarioActual = { id: 1, nombre: 'Usuario 1' }; 

  const getBookFromAllBooks = (barcode) => {
    setLoading(true); 
    const bookInAllBooks = allBooks.find((book) => book.codigo_barras === barcode);
    
    if (bookInAllBooks) {
      setBook(bookInAllBooks);
      setMessage(''); 
    } else {
      setBook(null);
      setMessage('Libro no encontrado en la base de datos.');
    }
    
    setLoading(false); 
  };

  const handleDocumentNumberChange = (e) => {
    setDocumentNumber(e.target.value);
  };

  const handleDocumentNumberSubmit = (e) => {
    e.preventDefault();
    setIsDocumentEntered(true);
  };

  const handleBarcodeChange = (e) => {
    const newBarcode = e.target.value;
    setBarcode(newBarcode);
    
    if (newBarcode.length >= 1) {
      getBookFromAllBooks(newBarcode);
    }
  };

  const handleLoanRequest = () => {
    if (book && book.ejemplares > 0) {
      const nuevoPrestamo = {
        fechaPrestamo: new Date().toLocaleString(),
        idUsuario: usuarioActual.id,
        idLibro: book.idLibro,
        tituloLibro: book.titulo,
        estado: 'PRESTADO',
      };

      setPrestamos([...prestamos, nuevoPrestamo]); 
      setBook({ ...book, ejemplares: book.ejemplares - 1 });
      setMessage(`Préstamo registrado exitosamente para el libro "${book.titulo}".`);
    } else {
      setMessage('No hay ejemplares disponibles de este libro.');
    }
  };

  const handleReturnRequest = () => {
    const loanIndex = prestamos.findIndex(prestamo => 
      prestamo.idLibro === book.idLibro && 
      prestamo.idUsuario === usuarioActual.id && 
      prestamo.estado === 'PRESTADO'
    );
    
    if (loanIndex !== -1) {
      const updatedPrestamos = [...prestamos];
      updatedPrestamos[loanIndex].estado = 'DEVUELTO';
      updatedPrestamos[loanIndex].fechaDevolucion = new Date().toLocaleString(); 
      
      setPrestamos(updatedPrestamos); 
      // Actualizar la cantidad de ejemplares disponibles
      setBook({ ...book, ejemplares: book.ejemplares + 1 });
      setMessage(`Devolución registrada exitosamente para el libro "${book.titulo}".`);
    } else {
      setMessage('No se encontró el préstamo para este libro.');
    }
  };

  return (
    <div className="barcode-scanner-container">
      {!isDocumentEntered ? (
        <>
          <h1>Ingrese su número de documento</h1>
          <form onSubmit={handleDocumentNumberSubmit}>
            <label>
              Número de documento:
              <input
                type="text"
                value={documentNumber}
                onChange={handleDocumentNumberChange}
              />
            </label>
            <button type="submit">Envía el número de Documento</button>
          </form>
        </>
      ) : (
        <>
          <h1>Escanea el código de barras</h1>
          <form>
            <label>
              Código de barras:
              <input
                type="text"
                value={barcode}
                onChange={handleBarcodeChange}
                placeholder="Escanea o ingresa el código de barras (ISBN)"
              />
            </label>
          </form>
          
          {message && <p className="message">{message}</p>}
          {loading && <div className="spinner"></div>}
          
          {book ? (
            <div className="book-info">
              <h2>{book.titulo}</h2>
              <p><strong>Autor:</strong> {book.autor}</p>
              <p><strong>Editorial:</strong> {book.editorial}</p>
              <p><strong>Descripción:</strong> {book.descripcion}</p>
              <p><strong>Ejemplares disponibles:</strong> {book.ejemplares}</p>

              <button onClick={handleLoanRequest}>Solicitar Préstamo</button>
              <button onClick={handleReturnRequest}>Devolver Libro</button> 
            </div>
          ) : (
            !loading && <p></p> 
          )}

          {prestamos.length > 0 && (
            <div className="loan-history">
              <h3>Historial de Préstamos</h3>
              <ul>
                {prestamos.map((prestamo, index) => (
                  <li key={index}>
                    <strong>{prestamo.tituloLibro}</strong> - {prestamo.estado} - {prestamo.fechaPrestamo}
                    {prestamo.estado === 'DEVUELTO' && `${prestamo.fechaDevolucion}`} 
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;
