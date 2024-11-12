import React, { useState } from 'react';
import './Footer.css';
import footer_logo from '../Assets/logotipo.png'; 
import instagram_icon from '../Assets/instagram_icon.png';
import facebook_icon from '../Assets/facebook_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { Link } from 'react-router-dom'


const Footer = () => {
    const [menu,setMenu] = useState();
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={footer_logo} alt='Logo' width='60px' />
        <p>AUTOBOOKS</p>
      </div>
        <ul className='footer-links'>
            <li>
                <a href="https://mercadoslogisticaytecnologia.blogspot.com" target="_blank" rel="noopener noreferrer" className="link-custom"> Aliado </a>
            </li>

            <li onClick={() => { setMenu("quienes_somos") }}><Link to='quienes_somos' className="link-custom">¿Quiénes Somos?</Link> {menu === "quienes_somos" ? <hr className="active-hr" /> : <></>}</li>

            <li>
                <a href="https://mercadoslogisticaytecnologia.blogspot.com" target="_blank" rel="noopener noreferrer" className="link-custom">Contactos </a>
            </li>

        </ul>

      <div className='footer-social-icon'>
        <div className='footer-icons-container'>
          <a href="https://www.instagram.com/senacomunica/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt='Instagram' width='30px' />
          </a>
        </div>

    <div className='footer-icons-container'>
        <a href="https://www.facebook.com/sistemabibliosena/?locale=es_LA" target="_blank" rel="noopener noreferrer">
            <img src={facebook_icon} alt='Facebook' width='30px' />
        </a>
    </div>


        <div className='footer-icons-container'>
    
          <a href="https://chat.whatsapp.com/JNtFrvmuDQIJmF8rmd8cwj" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt='WhatsApp' width='30px' />
          </a>

        </div>
      </div>
      <div className='footer-copyright'>
        <hr />
        <p>Servicio Nacional de Aprendizaje SENA - Dirección General</p>
        <p1>Copyright @ 2024 - Todos los derechos reservados. </p1>
      </div>
    </div>
  );
}

export default Footer;

