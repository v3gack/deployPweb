import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Seleccion from './components/seleccion';
import Drag from './components/DragDrop';
import Question from './components/Pregunta';
import Login from './components/Registros/Login';
import RegistroUsuario from './components/Registros/RegistroUsuario';

import Layout from './components/Layout'; // Añade esta línea

function App() {
  const [userRole, setUserRole] = useState('professor');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
        <Route path="*" element={
          <Layout userRole={userRole} setUserRole={setUserRole}>
            <Routes>
              <Route path="/seleccion" element={<Seleccion userRole={userRole} />} />
              <Route path="/Drag" element={<Drag />} />
              <Route path="/question" element={<Question />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;