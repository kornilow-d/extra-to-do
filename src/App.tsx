import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './layouts';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
