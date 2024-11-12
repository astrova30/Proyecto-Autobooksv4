import users from './users.js';
import allbooks from './allbooks.js';

// Lista de préstamos
let loans = [];

/**
 * Buscar usuario por código de barras
 * @param {string} barcode - Código de barras del usuario
 * @returns {object|null} - Usuario encontrado o null
 */
function findUserByBarcode(barcode) {
  return users.find(user => user.codigo_barras === barcode);
}

/**
 * Buscar libro por código de barras
 * @param {string} barcode - Código de barras del libro
 * @returns {object|null} - Libro encontrado o null
 */
function findBookByBarcode(barcode) {
  return allbooks.find(book => book.codigo_barras === barcode);
}

/**
 * Crear un préstamo para un usuario y un libro
 * @param {object} user - Objeto del usuario
 * @param {object} book - Objeto del libro
 * @returns {object} - El préstamo creado
 */
function createLoan(user, book) {
  const newLoan = {
    idUsuario: user.idUsuario,
    nombreUsuario: user.nombre,
    idLibro: book.id,
    tituloLibro: book.titulo,
    fechaPrestamo: new Date().toLocaleDateString(), // Fecha de préstamo
    devuelto: false // El préstamo aún no ha sido devuelto
  };
  
  loans.push(newLoan); // Añadir el préstamo a la lista
  console.log("Préstamo realizado:", newLoan); // Mensaje en consola
  return newLoan;
}

/**
 * Función para devolver un libro
 * @param {object} user - El usuario que devuelve el libro
 * @param {object} book - El libro a devolver
 */
function returnBook(user, book) {
  const loan = loans.find(loan => loan.idUsuario === user.idUsuario && loan.idLibro === book.id && !loan.devuelto);
  
  if (loan) {
    loan.devuelto = true; // Marcar como devuelto
    loan.fechaDevolucion = new Date().toLocaleDateString(); // Registrar la fecha de devolución
    console.log("Devolución exitosa:", loan);
  } else {
    console.log("No se encontró un préstamo activo para este libro y usuario.");
  }
}

/**
 * Función principal que se activa al escanear un código de barras
 * @param {string} barcode - Código de barras escaneado
 * @param {boolean} isReturning - Indica si es una devolución
 */
function onScan(barcode, isReturning = false) {
  const user = findUserByBarcode(barcode);
  
  if (user) {
    console.log("Usuario encontrado:", user.nombre);

    const bookBarcode = '9789586312134';
    const book = findBookByBarcode(bookBarcode);
    
    if (book) {
      console.log("Libro encontrado:", book.titulo);
      if (isReturning) {
        returnBook(user, book); 
      } else {
        createLoan(user, book); 
      }
    } else {
      console.log("Libro no encontrado.");
    }
  } else {
    console.log("Usuario no encontrado.");
  }
}


const userBarcode = "1030544214"; 
onScan(userBarcode); 

onScan(userBarcode, true); 
