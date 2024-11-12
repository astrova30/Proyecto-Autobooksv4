import React, { useState } from 'react';
import './CardGrid.css'; 
import image1 from '../Assets/educ.png';
import image2 from '../Assets/ocio.png';  
import allBooks from '../Assets/all_books'; 
import { Link } from 'react-router-dom'; 

const CardGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const cards = [
    { id: 1, image: image1, title: 'Apoyo a la investigacion', genre: 'Investigativo' },
    { id: 2, image: image2, title: 'Libros de ciencia educativa', genre: 'Ciencia' },
    { id: 3, image: image1, title: 'Libros de apoyo de historia', genre: 'Historia' },
    { id: 4, image: image2, title: 'Recurso fisicos', genre: 'Recursos' },
  ];

  const handleCardClick = (genre) => {
    setSelectedCategory(genre);
  };

  const filteredBooks = selectedCategory ? allBooks.filter(book => book.gender === selectedCategory) : [];

  return (
    <div>
      <div className="card-grid">
        {cards.map(card => (
          <div 
            key={card.id} 
            className="card" 
            onClick={() => handleCardClick(card.genre)} 
          >
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="filtered-books">
          <h2>{`Libros de ${selectedCategory}`}</h2>
          <div className="books-list">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-item">
                <Link to={`/library/${book.id}`}>
                  <img src={book.cover} alt={book.title} className="book-cover" />
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">
                    <span className="autor-label">Autor:</span> 
                    <span className="autor-nombre">{book.author}</span>
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="category-description">
            {selectedCategory === 'Investigativo' && (
              <p>Aquí encontrarás libros que te ayudarán en tus investigaciones, incluyendo ensayos, biografías y artículos científicos.</p>
            )}
            {selectedCategory === 'Ocio' && (
              <p>Disfruta de una selección de libros para tu tiempo libre, desde cuentos y leyendas hasta dramas y comedias.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid;
