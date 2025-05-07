import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Seleccion from './components/seleccion';
import Drag from './components/DragDrop';

function App() {
    // <Router>
    //  <nav className="p-4 bg-gray-200 flex gap-4">
    //  <Link to="/seleccion" className="text-blue-600 hover:underline">Crear</Link>
    //  <Link to="/drag" className="text-blue-600 hover:underline">Arrastrar y Soltar</Link>
    //  </nav>
    //   <Routes>
    //     <Route path="/seleccion" element={<Seleccion />} />
    //     <Route path="/DragDrop" element={<Drag/>} />
    //   </Routes>
    // </Router>
  return (

    <>
      <Drag/>
    </>
  );
}

export default App;
