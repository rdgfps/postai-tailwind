import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft, AiFillHome, AiOutlineBarChart, AiOutlinePlusCircle, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import '../styles/Configuracoes.css';

const Configuracoes = () => {
  const location = useLocation();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const NavItem = ({ to, icon: Icon }) => (
    <Link to={to} className={location.pathname === to ? 'active' : ''}>
      <Icon />
    </Link>
  );

  const ToggleSwitch = ({ label, isChecked, onToggle }) => (
    <div className="setting-toggle">
      <div className="setting-label-group">
        <span className="setting-label">{label}</span>
        {label === 'E-mail' && <span className="setting-description">Você será notificado por e-mail</span>}
      </div>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );

  return (
    <div className="configuracoes-container">
      <header className="config-header">
        <Link to="/perfil"><AiOutlineArrowLeft className="icon-back" /></Link>
        <h1>Configurações</h1>
        <button className="config-save-btn">Salvar</button>
      </header>

      <section className="config-section">
        <h2>Notificações</h2>
        <ToggleSwitch 
          label="Notificações Push"
          isChecked={pushNotifications}
          onToggle={() => setPushNotifications(!pushNotifications)}
        />
        <ToggleSwitch 
          label="E-mail"
          isChecked={emailNotifications}
          onToggle={() => setEmailNotifications(!emailNotifications)}
        />
      </section>

      <section className="config-section">
        <h2>Inteligência Artificial</h2>
        <ToggleSwitch 
          label="Sugestões de IA"
          isChecked={aiSuggestions}
          onToggle={() => setAiSuggestions(!aiSuggestions)}
        />
        <p className="setting-description smaller-text">Melhorar texto automaticamente.</p>
        
        <div className="setting-dropdown">
          <span className="setting-label">Idioma da IA</span>
          <select defaultValue="pt-BR">
            <option value="pt-BR">Português (BR)</option>
            <option value="en-US">English (US)</option>
          </select>
        </div>
      </section>

      <section className="config-section">
        <h2>Conta</h2>
        <div className="setting-group-box">
          <div className="setting-input-group">
            <label htmlFor="current-password">Alterar Senha</label>
            <input id="current-password" type="password" placeholder="Senha atual" />
          </div>
          <div className="setting-input-group">
            <input type="password" placeholder="Nova senha" />
          </div>
        </div>
      </section>
      
      <section className="config-section danger-zone">
        <h2>Zona de Perigo</h2>
        <div className="danger-box">
          <div className="danger-text">
            <p className="danger-label">Excluir Conta</p>
            <p className="danger-warning">Essa ação não pode ser desfeita.</p>
          </div>
          <button className="delete-button">Excluir</button>
        </div>
      </section>

      <div className="bottom-nav">
        <NavItem to="/dashboard" icon={AiFillHome} />
        <NavItem to="/analytics" icon={AiOutlineBarChart} />
        <NavItem to="/criar-post" icon={AiOutlinePlusCircle} />
        <NavItem to="/perfil" icon={AiOutlineUser} />
        <NavItem to="/configuracoes" icon={AiOutlineSetting} />
      </div>
    </div>
  );
};

export default Configuracoes;