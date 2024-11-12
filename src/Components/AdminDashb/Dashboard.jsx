// src/Components/AdminDashb/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h2>Panel de Administración</h2>
            <div className="stats-grid">
                {/* Ejemplo de tarjeta de estadísticas */}
                <div className="stat-card">
                    <h3>Usuarios</h3>
                    <p>10</p> {/* Esto se debe conectar con la base de datos */}
                </div>
                {/* Agregar más tarjetas aquí */}
            </div>
        </div>
    );
}

export default Dashboard;
