// components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AiFillHome, 
  AiOutlineBarChart, 
  AiOutlinePlusCircle, 
  AiOutlineUser, 
  AiOutlineSetting, 
  AiFillLock, 
  AiOutlineCalendar,
  AiOutlineRobot 
} from 'react-icons/ai';

const Sidebar = () => {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link 
      to={to} 
      className={`
        flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200
        ${location.pathname === to 
          ? 'bg-orange-500 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-orange-500'
        }
      `}
    >
      <Icon className="text-xl mr-3" />
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen flex flex-col p-6">
      {/* Logo */}
      <div className="sidebar-logo mb-8 flex items-center space-x-3">
        <img 
          src="logopostai.png" 
          alt="PostAi Logo" 
          className="w-10 h-10 object-contain"
        />
        <span className="logo-text text-2xl font-bold text-orange-500">PostAí</span>
      </div>
      
      {/* Navegação Principal */}
      <div className="nav-links flex-1">
        <NavItem to="/dashboard" icon={AiFillHome} label="Dashboard" />
        <NavItem to="/analytics" icon={AiOutlineBarChart} label="Analytics" />
        <NavItem to="/criar-post" icon={AiOutlinePlusCircle} label="Criar Post" />
        <NavItem to="/perfil" icon={AiOutlineUser} label="Perfil" />
        <NavItem to="/ia" icon={AiOutlineRobot} label="IA" />
        <NavItem to="/calendario" icon={AiOutlineCalendar} label="Calendário" />
      </div>

      {/* Navegação Footer */}
      <div className="nav-footer border-t border-gray-200 pt-4">
        <NavItem to="/configuracoes" icon={AiOutlineSetting} label="Configurações" />
      </div>
    </nav>
  );
};

export default Sidebar;