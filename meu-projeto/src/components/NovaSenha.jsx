import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLock } from 'react-icons/ai'; // Ícone de cadeado
import '../styles/RecuperarSenha.css'; 
import Swal from 'sweetalert2';

const NovaSenha = () => {
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função fictícia para simular a redefinição da senha
  const handleRedefinir = (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
        Swal.fire({
            title: "Erro!",
            text: "As senhas não coincidem.",
            icon: "error"
        });
        return;
    }


    if (novaSenha.length < 8 || !/[A-Z]/.test(novaSenha) || !/[0-9]/.test(novaSenha)) {
        Swal.fire({
            title: "Senha Fraca!",
            text: "A senha não atende a todos os requisitos. Verifique as regras abaixo do campo.",
            icon: "warning"
        });
        return;
    }

    // Em um app real, você faria a chamada à API para atualizar a senha
    console.log('Senha redefinida com sucesso.');
    
    Swal.fire({
        title: "Sucesso!",
        text: "Sua senha foi redefinida com sucesso!",
        icon: "success"
    });

    // Navega para a tela de login após a redefinição
    navigate('/'); 
  };

  return (
    <div className="recovery-container">
      {/* Ícone da flor */}
      <div className="recovery-logo">
        <img src="/path/to/your/flower-logo.png" alt="PostAi Logo" /> 
      </div>

      <div className="recovery-card">
        {/* Ícone da Nova Senha */}
        <div className="icon-box" style={{backgroundColor: 'var(--cor-principal, #3498db)'}}>
          <AiOutlineLock />
        </div>

        <header className="recovery-header">
          <h1 className="card-title">Nova Senha</h1>
          <p className="card-subtitle">
            Crie uma senha forte para proteger sua conta.
          </p>
        </header>

        <form onSubmit={handleRedefinir} className="recovery-form">
          <input
            type="password"
            placeholder="Digite sua nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digite novamente sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          <div className="password-rules">
              <p>Sua senha deve conter:</p>
              <ul>
                  <li>Mínimo de 8 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos um número</li>
              </ul>
          </div>
          
          <button type="submit" className="btn-primary-orange">
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovaSenha;