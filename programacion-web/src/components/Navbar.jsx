import React from 'react';
import UserInfoMenu from './usuarioInfo';
import '../styles/navbar.css'; // Asegúrate de que esta ruta sea correcta

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Sistema de Gestión de Preguntas</h1>
      <div className="navbar-user-info">
        <UserInfoMenu />
      </div>
    </nav>
  );
};

export default Navbar;