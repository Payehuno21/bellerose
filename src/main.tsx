// Archivo: src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Inicio from './pages/Inicio';
import Vender from './pages/Vender';
import Pedido from './pages/Pedido';
import Productos from './pages/Productos';
import Catalogo from './pages/Catalogo';
import Clientes from './pages/Clientes';
import Ventas from './pages/Ventas';
import Estadisticas from './pages/Estadisticas';
import Configuracion from './pages/Configuracion';
import './index.css';
import VentaDetalle from './pages/VentaDetalle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Navigate to="inicio" replace />} />
  <Route path="inicio" element={<Inicio />} />
  <Route path="vender" element={<Vender />} />
  <Route path="pedido" element={<Pedido />} />
  <Route path="productos" element={<Productos />} />
  <Route path="catalogo" element={<Catalogo />} />
  <Route path="clientes" element={<Clientes />} />
  <Route path="ventas" element={<Ventas />} />
  <Route path="estadisticas" element={<Estadisticas />} />
  <Route path="configuracion" element={<Configuracion />} />
</Route>
<Route path="/venta/:id" element={<VentaDetalle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
