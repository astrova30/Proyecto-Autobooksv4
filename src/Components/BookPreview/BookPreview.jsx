import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookPreview.css'; 
import book1 from '../Assets/books/book1.png'; 
import book2 from '../Assets/books/book2.png'; 
import book3 from '../Assets/books/book3.png'; 
import book4 from '../Assets/books/book4.png'; 
import book5 from '../Assets/books/book5.png'; 
import book10 from '../Assets/books/book10.png'; 
import book12 from '../Assets/books/book12.png';



const books = [
  {
    id: 1,
    isbn: '9789584239419',
    codigo_barras: '9789584239419',
    categoria: 'Novela',
    autor: 'Mario Mendoza',
    editorial: 'Editorial Planeta',
    fechaPublicacion: 2002,
    cantidadDisponible: null, 
    titulo: 'Satanás',
    descripcion: 'La vida de tres personajes – una mujer que roba a ejecutivos, un pintor con poderes misteriosos, y un sacerdote enfrentando una posesión demoníaca – se entrelaza con la historia de Campo Elías, un veterano de Vietnam obsesionado con la dualidad entre el bien y el mal.',
    serie: null, 
    tema: null, 
    cover: book1,
  },
  {
    id: 2,
    isbn: '9789585595026',
    codigo_barras: '9789585595026',
    categoria: 'Novela',
    autor: 'Stefan Zweig',
    editorial: 'Instituto Distrital de las Artes',
    fechaPublicacion: 2019,
    cantidadDisponible: null,
    titulo: 'Novela de ajedrez',
    descripcion: 'Durante un viaje en barco de Nueva York a Buenos Aires, el campeón mundial de ajedrez, Mirko Czentovicz, se enfrenta a un enigmático contrincante: el señor B., un noble vienés que huye de los nazis...',
    serie: null,
    tema: null,
    cover: book2,
  },
  {
    id: 3,
    isbn: '9788489163706',
    codigo_barras: '9788489163706',
    categoria: 'Teatro',
    autor: 'Molière',
    editorial: 'Mestas Ediciones',
    fechaPublicacion: 2012,
    cantidadDisponible: null, // Añadir si es relevante
    titulo: 'El avaro',
    descripcion: 'El protagonista, un hombre avaro y codicioso, está decidido a casarse con Mariana, sin saber que su propio hijo es el amante de la joven. La obra expone las contradicciones del deseo y la avaricia, con situaciones cómicas y giros inesperados.',
    serie: null, // Añadir si es relevante
    tema: null, // Añadir si es relevante
    cover: book3,
  },
  {
    id: 4,
    isbn: '8476140010',
    codigo_barras: '8476140010',
    categoria: 'Informática',
    autor: 'Rachelle S. Heller',
    editorial: 'Anaya multimedia',
    fechaPublicacion: 1985,
    cantidadDisponible: null, // Añadir si es relevante
    titulo: 'Bits y bytes: Iniciación a la informática',
    descripcion: 'Introducción a la informática y su impacto en la sociedad, cubriendo desde los conceptos básicos hasta el papel de los ordenadores en la vida cotidiana.',
    serie: null, // Añadir si es relevante
    tema: null, // Añadir si es relevante
    cover: book4,
  },
  {
    id: 5,
    isbn: '9789587783995',
    codigo_barras: '9789587783995',
    categoria: 'Programación',
    autor: 'José Dimas Luján Castillo',
    editorial: 'Alfaomega; RC Libros',
    fechaPublicacion: 2018,
    cantidadDisponible: null, // Añadir si es relevante
    titulo: 'Aprende a programar con Kotlin',
    descripcion: 'Guía completa sobre el lenguaje de programación Kotlin, incluyendo conceptos fundamentales, programación orientada a objetos, y cómo Kotlin se integra con Java.',
    serie: null, // Añadir si es relevante
    tema: null, // Añadir si es relevante
    cover: book5,
  },
  {id: 10,
    isbn: '9586312135',
    codigo_barras: '9789586312134',
    categoria: 'Matemáticas',
    autor: 'Héctor Alfonso Ruiz, Plutarco Elías Gil R.',
    editorial: 'Universidad Santo Tomás',
    fechaPublicacion: 1989,
    ejemplares: 5,
    titulo: 'Matemáticas básicas',
    descripcion: 'Incluye conceptos fundamentales y básicos de matemáticas, con ilustraciones que facilitan el entendimiento. El libro está dirigido a estudiantes de bibliotecas públicas y otras instituciones educativas.',
    serie: 'Ediciones Usta - Lista Básica-Bibliotecas Públicas 1',
    tema: 'Matemáticas básicas, Bibliografía matemática',
    notaPremio: null,
    cover: book10,
  },
  {id: 11,
    isbn: '',
    codigo_barras: '9789582421892',
    categoria: 'Filosofía',
    autor: 'Maria Cristina Sánchez León y Camilo Ordoñez Pinilla',
    editorial: 'Santillana',
    fechaPublicacion: 2012,
    ejemplares: 1,
    titulo: 'Pensamiento Filosófico',
    descripcion: 'Incluye conceptos fundamentales y básicos de la filosofía, con ilustraciones que facilitan el entendimiento. El libro está dirigido a estudiantes de bibliotecas públicas y otras instituciones educativas.',
    serie: 'Ediciones Usta - Lista Básica-Bibliotecas Públicas 1',
    tema: 'Filosofía Básica',
    ubicacion:'Piso 1 /Estante 1/ Fila 2',
    cover:book12,
    }
];

const BookPreview = () => {
  const navigate = useNavigate(); // Hook para navegar

  const handleBookClick = (bookId) => {
    navigate(`/library/${bookId}`); // Redirigir a la página de detalles del libro
  };

  return (
    <section id="catalogo-libros" className="book-preview">
      <h2>Libros Destacados</h2>
      <div className="book-grid">
        {books.map(book => (
          <div key={book.id} className="book-item" onClick={() => handleBookClick(book.id)}>
            <img src={book.cover} alt={book.titulo} className="book-cover" />
            <h3 className="book-title">{book.titulo}</h3>
            <p className="book-author">
              <span className="autor-label">Autor:</span> 
              <span className="autor-nombre">{book.autor}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookPreview;
