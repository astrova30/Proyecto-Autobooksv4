import React from 'react';
import '../Pages/CSS/AboutUs.css'; 
import images from '../Components/Assets/logosenanegro.png'

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>¿Quiénes Somos?</h1>
      <p>
      ¿Conoce qué es el Sistema de Bibliotecas del SENA? ¿Desea saber dónde quedan ubicadas las diferentes bibliotecas del Sistema?; o quizás, ¿desea conocer los proyectos, avances y las normativas que rigen nuestras bibliotecas?
      </p>
      <p>
      El Sistema de Bibliotecas del SENA, es la red de conocimiento institucional del SENA, encargada de fortalecer la cadena de valor institucional a través de la integración de los recursos bibliográficos, el talento humano y la infraestructura tecnológica y física necesarios para apoyar la transferencia, el desarrollo y el aprendizaje asociado a los programas de formación. Para cumplir con esto, desarrolla proyectos y dicta además las directrices y lineamientos para el funcionamiento de todas las bibliotecas del SENA, así como de la Biblioteca digital.
      </p>

      <div className='images'>
        <img src={images} alt ='' width={'200px'}></img>
      </div>
    </div>
  );
};

export default AboutUs;