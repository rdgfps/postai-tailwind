// components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Ícones SVG como fallback
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

const StatCard = ({ value, label, className = "" }) => (
  <div className={`text-center p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 ${className}`}>
    <p className="text-3xl font-bold text-orange-500">{value}</p>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
  </div>
);

const Dashboard = () => {
  const location = useLocation();

  const [perfil, setPerfil] = useState({ nome: "Usuário", foto: "" });
  const [posts, setPosts] = useState([]);
  const [postsAgendados, setPostsAgendados] = useState(0);
  const [postsPublicados, setPostsPublicados] = useState(0);
  const [engajamento, setEngajamento] = useState("0");
  const [alcance, setAlcance] = useState("0");

  useEffect(() => {
    try {
      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const storedPerfil = JSON.parse(localStorage.getItem("perfil")) || {};

      setPosts(storedPosts);
      setPostsAgendados(storedPosts.filter((p) => p.status === "agendado").length);
      setPostsPublicados(storedPosts.filter((p) => p.status === "publicado").length);
      setEngajamento(storedPerfil.engajamento || "0");
      setAlcance(storedPerfil.alcance || "0");
      setPerfil({
        nome: storedPerfil.nome || "Usuário",
        foto: storedPerfil.foto || "",
      });
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error);
    }
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto p-5 pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 pb-5 border-b border-gray-200">
        <div className="flex items-center">
          {perfil.foto ? (
            <img
              src={perfil.foto}
              alt="Perfil"
              className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover mr-4"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-xl font-bold mr-4">
              {perfil.nome.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold">Boas-vindas, {perfil.nome}!</h1>
            <p className="text-sm text-gray-500">Aqui estão seus dados de performance.</p>
          </div>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard value={postsAgendados} label="Agendados" />
        <StatCard value={postsPublicados} label="Publicados" />
        <StatCard value={engajamento} label="Engajamento" />
        <StatCard value={alcance} label="Alcance" />
      </div>

      {/* BOTÃO CRIAR */}
      <Link
        to="/criar-post"
        className="bg-orange-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-orange-600 transition mb-10 mx-auto block max-w-xs text-center"
      >
        + Criar Nova Postagem
      </Link>

      <MobileNav location={location} />
    </div>
  );
};

export default Dashboard;