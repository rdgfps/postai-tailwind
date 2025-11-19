import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import '../styles/RecuperarSenha.css'; 

const RecuperarSenha = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Link de recuperação enviado.');
    
    navigate('/email-enviado', { state: { email: 'seu@email.com' } }); 
  };

return (
    <div className="recovery-container">
        <div className="recovery-logo">
            <img src="/logopostai.png" alt="Logo PostAI" />
        </div>

        <div className="recovery-card">
            <header className="recovery-header">
                <h1 className="card-title">Recuperar Senha</h1>
                <p className="card-subtitle">
                    Digite seu e-mail cadastrado para receber as instruções de recuperação.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="recovery-form">
                <input
                    type="email"
                    placeholder="seu@email.com"
                    required
                />
                
                <button type="submit" className="btn-primary-orange">
                    Enviar Link de Recuperação
                </button>
            </form>

            <p className="info-text" style={{ marginTop: '20px' }}>
                Você receberá um e-mail com um link para redefinir sua senha.
            </p>

            <p className="info-text">
                Lembrou sua senha?
                <Link to="/" className="link-secondary"> Fazer Login</Link>
            </p>
        </div>
    </div>
);
};

export default RecuperarSenha;