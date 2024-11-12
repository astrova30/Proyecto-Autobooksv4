import React, { useContext, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Requestbook = ({ book }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleRequest = async () => {
        if (!isAuthenticated) {
            alert('Debe iniciar sesión para solicitar un préstamo.');
            navigate('/login');
            return;
        }

        // Lógica para enviar la solicitud de préstamo
        try {
            const response = await fetch('/api/prestamos/solicitar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, bookId: book.id }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage(`Solicitud de préstamo enviada para el libro: ${book.titulo}`);
            } else {
                alert('Hubo un problema al enviar la solicitud.');
            }
        } catch (error) {
            console.error('Error al solicitar préstamo:', error);
        }
    };

    return (
        <div>
            <button className="request-button" onClick={handleRequest}>
                Solicitar Préstamo
            </button>
            {message && <p className="confirmation-message">{message}</p>}
        </div>
    );
};

export default Requestbook;

