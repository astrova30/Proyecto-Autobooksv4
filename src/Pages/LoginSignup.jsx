import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Pages/CSS/LoginSignup.css';
import { useAuthorization } from '../Context/AuthContext';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar íconos de ojo

const LoginSignup = () => {
  const { login } = useAuthorization();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        correo: email,
        contraseña: password
      });

      // Almacena el token en localStorage
      localStorage.setItem('token', response.data.token);
      login();

      // Redirige al usuario a la página de inicio o perfil
      navigate('library/:id');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.mensaje || 'Error en el inicio de sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            required
            className="input full-width"
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Cambia el tipo según el estado showPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="input full-width"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)} // Cambia el estado para mostrar/ocultar contraseña
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícono de ojo */}
            </span>
          </div>

          <button type="submit" className="button">Iniciar Sesión</button>
        </form>
        <div className="link">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <br />
          <Link to="/register">Crear cuenta nueva</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

