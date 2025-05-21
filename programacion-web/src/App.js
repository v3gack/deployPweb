import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Seleccion from './components/seleccion';
import Drag from './components/DragDrop';
import Question from './components/Pregunta';
import Login from './components/Registros/Login'; // Mayúscula y ruta correcta
import RegistroUsuario from './components/Registros/RegistroUsuario'; // Mayúscula y ruta correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seleccion" element={<Seleccion />} />
        <Route path="/Drag" element={<Drag />} />
        <Route path="/question" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;