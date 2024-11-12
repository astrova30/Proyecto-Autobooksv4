import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando...</p>
        </div>
    );
};

export default LoadingPage;