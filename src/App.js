import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LoadingPage from './Components/LoadingPage/LoadingPage';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import HeroSection from './Components/HeroSection/HeroSection';
import BookPreview from './Components/BookPreview/BookPreview';
import Footer from './Components/Footer/Footer';
import AboutUs from './Pages/AboutUs';
import CardGrid from './Components/CardGrid/CardGrid';
import LoginRegister from './Pages/LoginRegister';
import ForgotPassword from './Pages/ForgotPassword';
//import AdminDashb from './Components/AdminDashb/AdminDashb';
//import LibraryInvent from './Components/AdminDashb/LibraryInvent';
import Cat from './Pages/Cat';
import Booklist from './Components/Booklist';
import LibraryDetail from './Pages/LibraryDetail';
import InvestigativeBooks from './Pages/InvestigativeBooks';
import LeisureBooks from './Pages/LeisureBooks';
import BarcodeScanner from './Components/BarcodeScanner';
import BookLoan from './Components/BookLoan';
import BookReturn from './Components/Bookreturn';
import UserProfile from './Pages/UserProfile';
//import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      )}
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  // Rutas donde queremos ocultar el Navbar
  const hideNavbarRoutes = ['/admin', '/inventario', '/perfil','/scanner'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="container mt-5">
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<><HeroSection /><BookPreview /><CardGrid /></>} />
          <Route path="/quienes_somos" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/books" element={<Booklist />} />
          <Route path="/library/:id" element=  //<ProtectedRoute>
                      {<LibraryDetail />} //</ProtectedRoute>
                      /> 

          {/* Nueva ruta para el perfil del usuario */}
          <Route path="/perfil" element={<UserProfile />} />

          {/* Otras rutas de la aplicación */}
          <Route path="/investigativo" element={<InvestigativeBooks />} />
          <Route path="/ocio" element={<LeisureBooks />} />
          <Route path="/catalogo" element={<Cat />} />

          {/* Rutas para bibliotecarios y admin */}

          {/* Escaneo de códigos de barras */}
          <Route path="/scanner" element={<BarcodeScanner />} />
          <Route path="/loan/:bookId" element={<BookLoan />} />
          <Route path="/return/:bookId" element={<BookReturn />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
