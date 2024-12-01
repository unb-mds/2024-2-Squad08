// src/AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/Home';
import Obras from './pages/Obras';
import Mapas from './pages/Mapas';
import Noticias from './pages/Noticias';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Footer from './components/footer';
import UserProfileForm from './pages/Auth/UserProfileForm';

const AppRouter = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/mapa" element={<Mapas />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UserProfileForm" element={<UserProfileForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;