import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar iconos de ojo
import axios from 'axios'; // Importar axios
import '../Pages/CSS/LoginRegister.css';

const LoginRegister = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [celphone, setCelphone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para confirmar contraseña

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    evaluatePasswordStrength(pwd);
  };

  const evaluatePasswordStrength = (pwd) => {
    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    if (strength <= 2) {
      setPasswordStrength('weak');
    } else if (strength === 3 || strength === 4) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (email !== confirmEmail) {
      setErrorMessage('Los correos no coinciden.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    if (passwordStrength === 'weak') {
      setErrorMessage('La contraseña es demasiado débil. Por favor, crea una más segura.');
      return;
    }

    try {
      console.log({
        nombre: name,
        apellido: surname,
        tipo_documento: documentType,
        documento: document,
        correo: email,
        telefono: celphone,
        contraseña: password,
      });
    
      // Hacer la solicitud POST con axios
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        nombre: name,
        apellido: surname,
        tipo_documento: documentType,
        documento: document,
        correo: email,
        telefono: celphone,
        contraseña: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      console.log('Usuario registrado:', response.data);
      navigate('/login'); // Redireccionar al usuario después del registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      // Verificar si error.response existe para obtener el mensaje del backend
      setErrorMessage(error.response?.data?.mensaje || 'Error en el registro. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Registro</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-row">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
              className="input input-half"
            />
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Apellidos"
              required
              className="input input-half"
            />
          </div>

          <div className="input-row">
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
              className="input input-half"
            >
              <option value="">Tipo de Documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="P">Pasaporte</option>
              <option value="RC">Registro Civil</option>
              <option value="PEP">Permiso Especial de Permanencia</option>
            </select>
            <input
              type="text"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="Número de Documento"
              required
              className="input input-half"
            />
          </div>

          <div className="input-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              required
              className="input input-half"
            />
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirmar Correo Electrónico"
              required
              className="input input-half"
            />
          </div>

          <div className="input-row">
            <input
              type="text"
              value={celphone}
              onChange={(e) => setCelphone(e.target.value)}
              placeholder="Número de Celular"
              required
              className="input full-width"
            />
          </div>

          <div className="input-row">
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Crear Contraseña"
                required
                className="input input-half"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                required
                className="input input-half"
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {password && (
            <div className="password-strength">
              <div className={`strength-bar ${passwordStrength}`} />
              <p className={`strength-text ${passwordStrength}`}>
                {passwordStrength === 'weak' && 'Débil'}
                {passwordStrength === 'medium' && 'Media'}
                {passwordStrength === 'strong' && 'Fuerte'}
              </p>
            </div>
          )}

          <button type="submit" className="button">Registrar</button>
        </form>
        <div className="link">
          <Link to="/login">Ya tengo una cuenta</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
