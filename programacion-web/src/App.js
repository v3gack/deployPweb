import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Seleccion from './components/seleccion';
import Drag from './components/DragDrop';
import Pregunta from './components/Pregunta';
import Login from './components/Registros/Login';
import RegistroUsuario from './components/Registros/RegistroUsuario';
import RellenarEspacios from './components/RellenarEspacios';
import Castor from './components/preguntaCastor';
import Layout from './components/Layout';
import Inicio from './components/Inicio';
import PrivateRoute from './components/PrivateRoute'; // suponiendo que valida sesión
import PuzzleRotate from './components/PuzzleRotate';

function App() {
  const [userRole, setUserRole] = useState('professor');

  const isLoggedIn = () => {
    return !!localStorage.getItem('usuario');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn() ? <Navigate to="/inicio" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registroUsuario" element={<RegistroUsuario />} />

        {/* Rutas protegidas */}
        <Route
          element={
            <PrivateRoute>
              <Layout userRole={userRole} setUserRole={setUserRole} />
            </PrivateRoute>
          }
        >
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/seleccion" element={<Seleccion userRole={userRole} />} />
          <Route path="/Drag" element={<Drag />} />
          <Route path="/pregunta/:id" element={<Pregunta />} />
          <Route path="/Rellenar" element={<RellenarEspacios />} />
          <Route path="/Castor" element={<Castor />} />
          <Route path="/Puzzle" element={<PuzzleRotate />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;