import React from 'react';

const Navbar = ({ userRole }) => {
  return (
    <nav className="navbar">
      <h1>Editor de Preguntas Interactivas pe</h1>
      <div className="user-info">
        <span className="user-role">{userRole === 'professor' ? 'Profesor' : 'Administrador'}</span>
        <span className="Puntos">{'Puntos'}</span>

      </div>
    </nav>
  );
};

export default Navbar;