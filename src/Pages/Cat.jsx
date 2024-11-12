import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import allBooks from '../Components/Assets/all_books';
import '../Pages/CSS/Cat.css';

const Cat = () => {
  const [filtroGenero, setFiltroGenero] = useState('Todos');

  const generosUnicos = Array.from(new Set(['Todos', ...allBooks.map(libro => libro.gender)]));

  const librosFiltrados = allBooks.filter(libro =>
    filtroGenero === 'Todos' || libro.gender === filtroGenero
  );

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Libros</h1>
      <div className="filtro-genero">
        <label>Filtrar por Género: </label>
        <select value={filtroGenero} onChange={e => setFiltroGenero(e.target.value)}>
          {generosUnicos.map(genero => (
            <option key={genero} value={genero}>{genero}</option>
          ))}
        </select>
      </div>
      <div className="libros-grid">
        {librosFiltrados.map(libro => (
          <div key={libro.id} className="libro-card">
            <Link to={`/library/${libro.id}`}>
              <img src={libro.cover} alt={libro.title} className="libro-portada" />
              <div className="libro-info">
                <h2>{libro.titulo}</h2>
                <p>
                  <span className="autor-label">Autor:</span> 
                  <span className="autor-nombre">{libro.autor}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cat;
