import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const PlusIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const MobileNav = ({ location }) => {
  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center ${
        location.pathname === to ? "text-orange-500" : "text-gray-500"
      } text-2xl p-3 transition hover:text-orange-400`}
    >
      <Icon />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center z-50 md:hidden">
      <NavItem to="/dashboard" icon={HomeIcon} label="Início" />
      <NavItem to="/analytics" icon={ChartIcon} label="Estatísticas" />
      <NavItem to="/criar-post" icon={PlusIcon} label="Criar" />
      <NavItem to="/perfil" icon={UserIcon} label="Perfil" />
      <NavItem to="/configuracoes" icon={SettingsIcon} label="Configurações" />
    </div>
  );
};

const Perfil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      const userData = JSON.parse(usuarioLogado);
      setUsuario(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32"></div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-16">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-600">
                    {usuario?.nome?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                {usuario?.nome || "Usuário"}
              </h1>
              <p className="text-gray-600 mt-1">{usuario?.email || "email@exemplo.com"}</p>
              
              <div className="flex gap-6 mt-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">1</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1%</div>
                  <div className="text-sm text-gray-600">Engajamento</div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Editar Perfil
              </button>
              
              <div className="space-y-2">
                <button
                 className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Contas Conectadas
                </button>
                <button onClick={navigate.bind(null, '/configuracoes')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  
                  Notificações
                </button>
                <button 
                onClick={navigate.bind(null, '/suporte')}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  Ajuda e Suporte
                </button>
                <button 
                  onClick={navigate.bind(null, '/')}
                  className="w-full text-left p-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sair da Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileNav location={location} />
    </div>
  );
};

export default Perfil;