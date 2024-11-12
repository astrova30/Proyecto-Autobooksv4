import React, { useState } from 'react';
import '../Pages/CSS/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulación de una solicitud al servidor para la recuperación de contraseña
      const response = await fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el enlace de recuperación.');
      }

      setSuccessMessage('Enlace de recuperación enviado a tu correo.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Recuperar Contraseña</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleForgotPassword}>
          <input 
            type="email" 
            placeholder="Ingresa tu correo SoySena" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="input"
          />
          <button type="submit" className="button">Enviar enlace</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
