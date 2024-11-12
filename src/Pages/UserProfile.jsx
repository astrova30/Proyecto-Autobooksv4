import React, { useState, useEffect } from 'react';
import './CSS/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    // Eliminé 'direccion' si no es necesario
  });
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const usuarioActual = { id: 1 }; // O utiliza una fuente dinámica de ID

  useEffect(() => {
    // Llamada para obtener el perfil
    fetch(`http://localhost:3001/api/perfil/${usuarioActual.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono,
        });
      })
      .catch((error) => {
        console.error('Error al obtener los datos del usuario:', error);
        setMessage('Error al obtener los datos del usuario.');
      });
  }, [usuarioActual.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('correo', formData.correo);
    formDataToSend.append('telefono', formData.telefono);
    if (selectedFile) {
      formDataToSend.append('fotoPerfil', selectedFile);
    }

    fetch(`http://localhost:3001/api/perfil/${usuarioActual.id}`, {
      method: 'PUT',
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsEditing(false);
        setMessage('Perfil actualizado exitosamente.');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
        setMessage('Error al actualizar el perfil.');
      });
  };

  return (
    <div className="user-profile-container">
      <h1>Perfil de Usuario</h1>
      {message && <p className="message">{message}</p>}
      {user ? (
        <form onSubmit={handleSave}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Subir nueva foto de perfil:
            <input type="file" onChange={handleFileChange} disabled={!isEditing} />
          </label>
          {isEditing ? (
            <button type="submit">Guardar Cambios</button>
          ) : (
            <button type="button" onClick={handleEditToggle}>Editar Perfil</button>
          )}
        </form>
      ) : (
        <p>Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default UserProfile;
