import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

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

const Configuracoes = () => {
  const location = useLocation();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const ToggleSwitch = ({ label, isChecked, onToggle, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <span className="block font-medium text-gray-900">{label}</span>
        {description && <span className="block text-sm text-gray-500 mt-1">{description}</span>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={isChecked} 
          onChange={onToggle} 
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto p-6 pb-32">
        
        <header className="mb-5">
          <div className="flex items-center justify-between px-20">
            <Link to="/perfil" className="flex items-center text-gray-600 hover:text-gray-900 transition">
              <AiOutlineArrowLeft className="text-xl mr-2" />
              <span className="font-medium">Voltar</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <button className="bg-orange-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-orange-600 transition shadow-md whitespace-nowrap text-sm">
              Salvar
            </button>
          </div>
        </header>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notificações</h2>
            <ToggleSwitch 
              label="Notificações Push"
              isChecked={pushNotifications}
              onToggle={() => setPushNotifications(!pushNotifications)}
            />
            <ToggleSwitch 
              label="E-mail"
              isChecked={emailNotifications}
              onToggle={() => setEmailNotifications(!emailNotifications)}
              description="Você será notificado por e-mail"
            />
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inteligência Artificial</h2>
            <ToggleSwitch 
              label="Sugestões de IA"
              isChecked={aiSuggestions}
              onToggle={() => setAiSuggestions(!aiSuggestions)}
              description="Melhorar texto automaticamente"
            />
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Idioma da IA</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition bg-white">
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Conta</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alterar Senha</label>
                <input 
                  type="password" 
                  placeholder="Senha atual" 
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition" 
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Nova senha" 
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition" 
                />
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-200">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Zona de Perigo</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-700">Excluir Conta</p>
                <p className="text-red-600 text-sm mt-1">Essa ação não pode ser desfeita.</p>
              </div>
              <button className="bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-red-700 transition text-sm">
                Excluir
              </button>
            </div>
          </section>
        </div>
      </div>

      <MobileNav location={location} />
    </div>
  );
};

export default Configuracoes;