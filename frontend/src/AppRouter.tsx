// src/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
// import NavBar from './components/navbar';
import Noticias from './pages/Noticias';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/footer';

const AppRouter = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;