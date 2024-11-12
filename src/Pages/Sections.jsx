import React from 'react';
import './CSS/Sections.css'; 
import CardGrid from '../Components/CardGrid/CardGrid'; 

const Sections = () => {
  return (
    <div className="sections-container">
      <h2>Selecciona una Categoría</h2>
      <CardGrid />
    </div>
  );
};

export default Sections;
