// src/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Endereco from './pages/Endereco';
import Senha from './pages/Senha';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Footer from './components/Footer';
import MapaGeral from './pages/MapaGeral';
import FiltroValor from './pages/FiltroValor';
import FiltroExecutor from './pages/FiltroExecutor';
import FiltroRegiao from './pages/FiltroRegiao';
import FiltroTipo from './pages/FiltroTipo';

const AppRouter = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/endereco" element={<Endereco />} />
        <Route path="/senha" element={<Senha />} />
        <Route path="/mapa" element={<MapaGeral />} />
        <Route path="/executor" element={<FiltroExecutor />} />
        <Route path="/regiao" element={<FiltroRegiao />} />
        <Route path="/valor" element={<FiltroValor />} />
        <Route path="/tipo" element={<FiltroTipo />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;