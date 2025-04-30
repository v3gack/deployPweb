import React from 'react';

const RoleSelector = ({ userRole, setUserRole }) => {
  return (
    <div className="role-selector">
      <button 
        className={userRole === 'professor' ? 'active' : ''}
        onClick={() => setUserRole('professor')}
      >
        Modo Profesor
      </button>
      <button 
        className={userRole === 'admin' ? 'active' : ''}
        onClick={() => setUserRole('admin')}
      >
        Modo Administrador
      </button>
    </div>
  );
};

export default RoleSelector;
