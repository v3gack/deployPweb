// src/components/usuarioInfo.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/usuarioInfo.css';

const UserInfoMenu = () => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/usuario/perfil', {
          withCredentials: true,
        });
        setUserData(res.data.usuario);
      } catch (err) {
        console.error('Error al obtener datos del usuario:', err);
      }
    };

    fetchUser();

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="user-info-container" ref={menuRef}>
      <div className="user-icon" onClick={() => setVisible((v) => !v)}>
        <FaUserCircle size={32} color="#fff" />
      </div>

      {visible && userData && (
        <div className="user-dropdown">
          <p><strong>Nombre:</strong> {userData.nombre}</p>
          <p><strong>Rol:</strong> {userData.rol}</p>
          {sessionStorage.getItem('fechaLogin') && (
            <p><strong>Logueado desde:</strong> {new Date(sessionStorage.getItem('fechaLogin')).toLocaleString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoMenu;