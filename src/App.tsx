import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import NFLPage from './pages/nfl';
import ScalePage from './pages/scale';
import AdminPage from './pages/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={
          <Layout>
            <NFLPage />
          </Layout>
        } />
        <Route path="/scale" element={
          <Layout>
            <ScalePage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;