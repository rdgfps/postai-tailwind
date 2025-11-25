import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai';
import '../styles/RecuperarSenha.css';

const EmailEnviado = () => {
  const location = useLocation();
  const userEmail = location.state?.email || 'usuario@email.com'; 

  return (
    <div className="recovery-container">
      <div className="recovery-logo">
        <img src="/logopostai.png" alt="PostAi Logo" /> 
      </div>

      <div className="recovery-card">
        <div className="icon-box">
          <AiOutlineMail />
        </div>

        <header className="recovery-header">
          <h1 className="card-title">E-mail Enviado!</h1>
        </header>

        <p className="info-text">
          Enviamos um link de recuperação para: 
          <span style={{ color: '#0d1e57', fontWeight: 'bold' }}> {userEmail}</span>.
        </p>
        <p className="info-text">
          Verifique sua caixa de entrada e spam. O link expira em 30 minutos.
        </p>

        <button type="button" className="btn-primary-orange">
          Reenviar E-mail
        </button>
        
        <Link to="/" className="btn-primary-orange" style={{backgroundColor: '#e0e0e0', color: '#333', marginTop: '10px'}}>
          <AiOutlineArrowLeft style={{marginRight: '8px'}} /> Voltar para Login
        </Link>
        
        <p className="info-text" style={{ marginTop: '20px', fontSize: '0.85rem' }}>
          Você pode solicitar um novo e-mail em 60 segundos.
        </p>
      </div>
    </div>
  );
};

export default EmailEnviado;