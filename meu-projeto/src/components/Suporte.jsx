import React from "react";
import "../styles/Suporte.css";
import { Search, User, FileText, Wrench, ArrowLeft } from "lucide-react";

const App = () => {
  return (
    <div className="suporte-container">
      <a href="#" className="back-button" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
          <ArrowLeft size={18} />
          Voltar
      </a>
      <h1 className="suporte-title">Central de Ajuda</h1>
      <p className="suporte-subtitle">
        Encontre respostas rápidas ou fale com nossa equipe de suporte.
      </p>

      <div className="suporte-search">
        <Search size={18} />
        <input type="text" placeholder="Buscar ajuda..." />
      </div>

      <div className="suporte-sections">
        <div className="suporte-card">
          <User className="icon" size={22} />
          <div>
            <h3>Configurações de Conta</h3>
            <p>Gerencie seu perfil e preferências</p>
          </div>
        </div>

        <div className="suporte-card active">
          <FileText className="icon" size={22} />
          <div>
            <h3>Publicação de Conteúdo</h3>
            <p>Aprenda a criar e publicar posts</p>
          </div>
        </div>

        <div className="suporte-card">
          <Wrench className="icon" size={22} />
          <div>
            <h3>Problemas Técnicos</h3>
            <p>Resolva erros e dificuldades técnicas</p>
          </div>
        </div>
      </div>

      <div className="suporte-faq">
        <h2>Perguntas Frequentes</h2>

        <div className="faq-item">
          <h4>Como altero minha senha?</h4>
          <p>Para alterar sua senha, vá até as configurações da conta e selecione "Alterar Senha".</p>
        </div>

        <div className="faq-item">
          <h4>Como publico um novo post?</h4>
          <p>
            Clique no botão “+” no dashboard, adicione conteúdo e clique em
            Publicar.
          </p>
        </div>

        <div className="faq-item">
          <h4>O que fazer se o app não carregar?</h4>
          <p>
            Verifique sua conexão, atualize o app ou entre em contato com o
            suporte.
          </p>
        </div>
      </div>

      <div className="suporte-contato">
        <h2>Precisa de mais ajuda?</h2>
        <p>Nossa equipe está pronta para ajudar você.</p>
        <button className="chat-btn">Abrir Chat de Suporte</button><br />
        <button className="email-btn">Enviar E-mail</button>
      </div>
    </div>
  );
};

export default App;