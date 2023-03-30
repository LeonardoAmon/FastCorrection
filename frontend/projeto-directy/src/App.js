import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicial from './components/PaginaInicial';
import PaginaHistorico from './components/PaginaHistorico';

function App() {
  function redirectTo(path) {
    window.location.href = path;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<PaginaInicial redirectTo={redirectTo} />} />
          <Route path="/historico" element={<PaginaHistorico />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
