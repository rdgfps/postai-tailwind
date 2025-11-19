// components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Criando componentes de ícone como fallback
const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const PlusIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const RobotIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
const CalendarIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

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
      <Icon />
      <span className="font-medium ml-3">{label}</span>
    </Link>
  );

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen flex flex-col p-6">
      {/* Logo */}
      <div className="sidebar-logo mb-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
          P
        </div>
        <span className="logo-text text-2xl font-bold text-orange-500">PostAí</span>
      </div>
      
      {/* Navegação Principal */}
      <div className="nav-links flex-1">
        <NavItem to="/dashboard" icon={HomeIcon} label="Dashboard" />
        <NavItem to="/analytics" icon={ChartIcon} label="Analytics" />
        <NavItem to="/criar-post" icon={PlusIcon} label="Criar Post" />
        <NavItem to="/perfil" icon={UserIcon} label="Perfil" />
        <NavItem to="/ia" icon={RobotIcon} label="IA" />
        <NavItem to="/calendario" icon={CalendarIcon} label="Calendário" />
      </div>

      {/* Navegação Footer */}
      <div className="nav-footer border-t border-gray-200 pt-4">
        <NavItem to="/configuracoes" icon={SettingsIcon} label="Configurações" />
      </div>
    </nav>
  );
};

export default Sidebar;