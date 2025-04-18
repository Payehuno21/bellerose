// Archivo: src/components/Dashboard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMenu,
  FiHome,
  FiShoppingCart,
  FiClipboard,
  FiBox,
  FiBookOpen,
  FiUsers,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
} from 'react-icons/fi';
import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: <FiHome />, label: 'Inicio', path: 'inicio' },
    { icon: <FiShoppingCart />, label: 'Vender', path: 'vender' },
    { icon: <FiClipboard />, label: 'Pedido', path: 'pedido' },
    { icon: <FiClipboard />, label: 'Cotización', path: 'cotizacion' },
    { icon: <FiBox />, label: 'Productos', path: 'productos' },
    { icon: <FiBookOpen />, label: 'Catálogo', path: 'catalogo' },
    { icon: <FiUsers />, label: 'Clientes', path: 'clientes' },
    { icon: <FiTrendingUp />, label: 'Ventas', path: 'ventas' },
    { icon: <FiBarChart2 />, label: 'Estadísticas', path: 'estadisticas' },
    { icon: <FiSettings />, label: 'Configuración', path: 'configuracion' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        animate={{ width: sidebarOpen ? 220 : 60 }}
        className="bg-[#fbd5e5] shadow-lg flex flex-col items-start py-4 px-2 transition-all duration-300 overflow-hidden"
      >
        <button
          className="mb-6 ml-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu className="text-[#b68d40] text-2xl" />
        </button>

        <div className="flex flex-col gap-3 text-[#b68d40] w-full">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#f7bba6] rounded cursor-pointer"
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 bg-[#fdeaf2] p-8">
        {location.pathname === '/dashboard' && <Navigate to="/dashboard/inicio" replace />}
        <Outlet />
      </div>
    </div>
  );
}
