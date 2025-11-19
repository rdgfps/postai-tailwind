import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineUser,
  AiOutlineEdit,
  AiOutlineBell,
  AiOutlineLock,
  AiOutlineSetting,
  AiFillHome,
  AiOutlineBarChart,
  AiOutlinePlusCircle
} from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import '../styles/Perfil.css';

const Perfil = () => {
  const location = useLocation();

  const [user, setUser] = useState({
    nome: 'Usuário',
    email: 'usuario@email.com',
    foto: '', 
    posts: 0,
    seguidores: 0,
    engajamento: '0%',
  });

  useEffect(() => {
  
    const dadosSalvos = JSON.parse(localStorage.getItem('perfil'));

    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    
    const totalPosts = storedPosts.length;

    if (dadosSalvos || totalPosts > 0) {
        setUser(prevUser => ({ 
           ...prevUser, 
           ...(dadosSalvos || {}), 

           posts: totalPosts, 
           seguidores: dadosSalvos?.seguidores || 0,
           engajamento: dadosSalvos?.engajamento || '0%',
           foto: dadosSalvos?.foto || '',
        }));
    }
  }, []); 

  const getInitials = (nome) => {
    if (!nome) return 'US';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  const NavItem = ({ to, icon: Icon }) => (
    <Link to={to} className={location.pathname === to ? 'active' : ''}>
      <Icon />
    </Link>
  );

  const ProfileOption = ({ icon: Icon, label, to }) => (
    <Link to={to} className="profile-option">
      <Icon className="option-icon" />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <h1>Meu Perfil</h1>
      </header>

      <div className="user-info-card">
        <div className="user-avatar-wrapper">
            {user.foto ? (
                <img src={user.foto} alt="Foto de Perfil" className="user-avatar-img" />
            ) : (
                <div className="user-avatar">{getInitials(user.nome)}</div>
            )}
        </div>
        
        <p className="user-name">{user.nome}</p>
        <p className="user-email">{user.email}</p>

        <div className="user-stats">
          <div className="stat-item-perfil">
            <p className="stat-number">{user.posts}</p>
            <p className="stat-label">Posts</p>
          </div>
          <div className="stat-item-perfil">
            <p className="stat-number">{user.seguidores}</p>
            <p className="stat-label">Seguidores</p>
          </div>
          <div className="stat-item-perfil">
            <p className="stat-number">{user.engajamento}</p>
            <p className="stat-label">Engajamento</p>
          </div>
        </div>
      </div>

      <div className="profile-options-list">
        <ProfileOption icon={AiOutlineEdit} label="Editar Perfil" to="/editar-perfil" />
        <ProfileOption icon={FaRegUserCircle} label="Contas Conectadas" to="/perfil/contas" />
        <ProfileOption icon={AiOutlineBell} label="Notificações" to="/configuracoes" />
        <ProfileOption icon={AiOutlineSetting} label="Ajuda e Suporte" to="/suporte" />
      </div>

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

export default Perfil;