import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logotipo.png';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../Context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuthorization();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Buscando:", searchTerm);
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='Logotipo de Autobooks' />
        <p>AUTOBOOKS</p>
      </div>

      <ul className='nav-menu'>
        <li><Link to='/'>Inicio</Link></li>
        <li><Link to='/catalogo'>Catálogo</Link></li>
        <li><Link to='/quienes_somos'>Nosotros</Link></li>
        {isLoggedIn && <li><Link to='/prestamos'>Préstamos</Link></li>}
      </ul>

      <div className={`nav-search-icon ${searchVisible ? 'active' : ''}`} onClick={toggleSearchVisibility}>
        <FaSearch />
      </div>

      {searchVisible && (
        <form className='nav-search' onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Buscar libros...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit'>Buscar</button>
        </form>
      )}

      <div className='nav-buttons'>
        {isLoggedIn && (
          <Link to='/perfil'>
            <FaUserCircle className="user-icon" title="Ver Perfil" />
          </Link>
        )}
        <button onClick={() => (isLoggedIn ? logout() : navigate('/login'))}>
          {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
