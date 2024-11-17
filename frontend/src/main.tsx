// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRouter from './AppRouter';
import Footer from './components/footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AppRouter />
      <Footer />
    </Router>
  </StrictMode>,
);