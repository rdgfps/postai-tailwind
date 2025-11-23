import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postService } from './PostService';

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

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    publicados: 0,
    agendados: 0,
    rascunhos: 0
  });

  // Verificar posts agendados e atualizar estatísticas
  const atualizarEstatisticas = async () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      const userData = JSON.parse(usuarioLogado);
      // Verificar se o userId é válido
      if (userData.id && userData.id !== "null" && userData.id !== "undefined") {
        const stats = await postService.buscarEstatisticas(userData.id);
        setEstatisticas(stats);
      }
    }
  };

  const carregarPosts = async () => {
    try {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        const userData = JSON.parse(usuarioLogado);
        
        // Verificar se o userId é válido
        if (!userData.id || userData.id === "null" || userData.id === "undefined") {
          console.error("ID de usuário inválido no localStorage");
          return;
        }

        setUsuario(userData);

        const response = await fetch("http://localhost:3001/posts");
        if (!response.ok) {
          throw new Error("Erro ao carregar posts");
        }

        const todosPosts = await response.json();
        
        const postsDoUsuario = todosPosts.filter(
          (post) => post.usuarioId && post.usuarioId.toString() === userData.id.toString()
        );
        
        // Ordenar posts por data (mais recentes primeiro)
        const postsOrdenados = postsDoUsuario.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setPosts(postsOrdenados.slice(0, 5)); // Mostrar apenas os 5 mais recentes
        await atualizarEstatisticas();
      }
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  };

  useEffect(() => {
    // Verificar posts agendados quando o dashboard carregar
    postService.verificarEPublicarPostsAgendados().then(() => {
      carregarPosts();
    });

    // Atualizar estatísticas periodicamente
    const interval = setInterval(() => {
      postService.verificarEPublicarPostsAgendados().then(() => {
        carregarPosts();
      });
    }, 30000); // A cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const formatarData = (dataString) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Data inválida";
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      publicado: { cor: 'bg-green-100 text-green-800', texto: 'Publicado' },
      agendado: { cor: 'bg-blue-100 text-blue-800', texto: 'Agendado' },
      rascunho: { cor: 'bg-yellow-100 text-yellow-800', texto: 'Rascunho' }
    };
    
    const { cor, texto } = config[status] || config.rascunho;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cor}`}>{texto}</span>;
  };

  const getPlataformaIcon = (plataforma) => {
    const plataformas = {
      instagram: { cor: 'text-pink-600', nome: 'Instagram' },
      facebook: { cor: 'text-blue-600', nome: 'Facebook' },
      twitter: { cor: 'text-blue-400', nome: 'Twitter' },
      linkedin: { cor: 'text-blue-700', nome: 'LinkedIn' },
      tiktok: { cor: 'text-black', nome: 'TikTok' }
    };
    
    const plataformaInfo = plataformas[plataforma] || plataformas.instagram;
    return (
      <div className={`flex items-center space-x-1 ${plataformaInfo.cor}`}>
        <span className="text-sm font-medium">{plataformaInfo.nome}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo de volta, {usuario?.nome || 'Usuário'}!
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Posts</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.total}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.publicados}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agendados</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.agendados}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.rascunhos}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/criar-post"
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-dashed border-gray-300 hover:border-orange-500 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors">
                <PlusIcon />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                Criar Novo Post
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Compartilhe suas ideias
              </p>
            </div>
          </Link>

          <Link
            to="/analytics"
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500 transition-colors">
                <ChartIcon />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Ver Estatísticas
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Acompanhe seu desempenho
              </p>
            </div>
          </Link>

          <Link
            to="/calendario"
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500 transition-colors">
                <svg className="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                Calendário
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Gerencie seus agendamentos
              </p>
            </div>
          </Link>
        </div>

        {/* Posts Recentes */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Posts Recentes</h2>
            <Link
              to="/criar-post"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Criar Post
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusIcon />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum post criado ainda
              </h3>
              <p className="text-gray-600 mb-4">
                Comece criando seu primeiro post para ver ele aqui.
              </p>
              <Link
                to="/criar-post"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors inline-block"
              >
                Criar Primeiro Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={`post-${post.id}-${post.plataforma}`}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {post.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.conteudo}
                      </p>
                    </div>
                    {post.imagemUrl && (
                      <img
                        src={post.imagemUrl}
                        alt="Post"
                        className="w-16 h-16 object-cover rounded-lg ml-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {getPlataformaIcon(post.plataforma)}
                      {getStatusBadge(post.status)}
                      <span className="text-sm text-gray-500">
                        {formatarData(post.status === 'agendado' ? post.data : post.createdAt)}
                      </span>
                    </div>
                    
                    {post.status === 'agendado' && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Agendado para {formatarData(post.data)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                to="/analytics"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Ver todos os posts →
              </Link>
            </div>
          )}
        </div>
      </div>

      <MobileNav location={location} />
    </div>
  );
};

export default Dashboard;