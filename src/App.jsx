import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import CriarPost from './components/CriarPost.jsx';
import Perfil from './components/Perfil.jsx';
import Configuracoes from './components/Configuracoes.jsx';
import Analytics from './components/Analytics.jsx';
import Sidebar from './components/Sidebar.jsx'; 
import Register from './components/Register.jsx';
import EditarPerfil from './components/EditarPerfil.jsx';
import Ia from './components/Ia.jsx';
import RecuperarSenha from './components/RecuperarSenha.jsx';
import EmailEnviado from './components/EmailEnviado.jsx';
import NovaSenha from './components/NovaSenha.jsx';
import Suporte from './components/Suporte.jsx';
import CalendarioPosts from './components/CalendarioPosts.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />      
          <Route path="/register" element={<Register />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/email-enviado" element={<EmailEnviado />} />
          <Route path="/nova-senha" element={<NovaSenha />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/criar-post" element={<Layout><CriarPost /></Layout>} />
          <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
          <Route path="/configuracoes" element={<Layout><Configuracoes /></Layout>} />
          <Route path="/editar-perfil" element={<Layout><EditarPerfil /></Layout>} />
          <Route path="/ia" element={<Layout><Ia /></Layout>} />
          <Route path="/suporte" element={<Layout><Suporte /></Layout>} />
          <Route path="/calendario" element={<Layout><CalendarioPosts /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;