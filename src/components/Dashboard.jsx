import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const PlusIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BellIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-3.78-1.53A6 6 0 008 14v.001h8V14a6 6 0 00-9-5.197" /></svg>;

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

const apiService = {
  async getPosts() {
    const response = await fetch("http://localhost:3001/posts");
    if (!response.ok) throw new Error("Erro ao carregar posts");
    return response.json();
  },

  async getUsuario(id) {
    const response = await fetch(`http://localhost:3001/usuarios/${id}`);
    if (!response.ok) throw new Error("Usuário não encontrado");
    return response.json();
  },

  async criarPost(post) {
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error("Erro ao criar post");
    return response.json();
  },

  async atualizarPost(postId, updates) {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error(`Erro ao atualizar post ${postId}`);
    return response.json();
  },
};

// Sistema de lembretes local (fallback)
const LembreteService = {
  KEY: 'postai_lembretes',

  salvarLembrete(postId, texto) {
    const lembretes = this.getLembretes();
    lembretes[postId] = {
      texto,
      postId,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };
    localStorage.setItem(this.KEY, JSON.stringify(lembretes));
    return lembretes[postId];
  },

  getLembretes() {
    return JSON.parse(localStorage.getItem(this.KEY) || '{}');
  },

  getLembrete(postId) {
    const lembretes = this.getLembretes();
    return lembretes[postId] || null;
  },

  deletarLembrete(postId) {
    const lembretes = this.getLembretes();
    if (lembretes[postId]) {
      delete lembretes[postId];
      localStorage.setItem(this.KEY, JSON.stringify(lembretes));
      return true;
    }
    return false;
  }
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
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [lembreteModal, setLembreteModal] = useState({ 
    isOpen: false,
    postId: null, 
    texto: '',
    tituloModal: '',
    postTitulo: ''
  });
  const [erroLembrete, setErroLembrete] = useState('');
  const [lembretesLocais, setLembretesLocais] = useState({});

  const inicializarUsuario = async () => {
    try {
      const usuarioSalvo = localStorage.getItem("usuarioLogado");
      
      if (usuarioSalvo) {
        const userData = JSON.parse(usuarioSalvo);
        try {
          const usuarioAPI = await apiService.getUsuario(userData.id);
          setUsuario(usuarioAPI);
          return usuarioAPI;
        } catch (error) {
          setUsuario(userData);
          return userData;
        }
      } else {
        const usuarioDemo = await apiService.getUsuario("1");
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioDemo));
        setUsuario(usuarioDemo);
        return usuarioDemo;
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      const usuarioFallback = {
        id: "1",
        nome: "Usuário Demo",
        email: "usuario@demo.com",
        bio: "Bem-vindo ao PostAí!"
      };
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioFallback));
      setUsuario(usuarioFallback);
      return usuarioFallback;
    }
  };

  const carregarPosts = async () => {
    try {
      setCarregando(true);
      setErro("");
      
      const usuarioAtual = await inicializarUsuario();
      const todosPosts = await apiService.getPosts();
      
      const postsDoUsuario = todosPosts.filter(
        post => post.usuarioId && post.usuarioId.toString() === usuarioAtual.id.toString()
      );

      // Carrega lembretes locais
      const lembretes = LembreteService.getLembretes();
      setLembretesLocais(lembretes);

      // Combina posts da API com lembretes locais
      const postsComLembretes = postsDoUsuario.map(post => ({
        ...post,
        lembrete: lembretes[post.id]?.texto || post.lembrete || ''
      }));

      const postsOrdenados = postsComLembretes.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(postsOrdenados.slice(0, 5));
      
      setEstatisticas({
        total: postsDoUsuario.length,
        publicados: postsDoUsuario.filter(p => p.status === 'publicado').length,
        agendados: postsDoUsuario.filter(p => p.status === 'agendado').length,
        rascunhos: postsDoUsuario.filter(p => p.status === 'rascunho').length
      });

    } catch (error) {
      console.error("Erro ao carregar posts:", error);
      setErro("Não foi possível carregar os posts. Verifique se o JSON Server está rodando.");
      setPosts([]);
      setEstatisticas({ total: 0, publicados: 0, agendados: 0, rascunhos: 0 });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPosts();
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

  const handleAbrirLembreteModal = (post) => {
    const isEditing = !!post.lembrete;
    setLembreteModal({ 
      isOpen: true,
      postId: post.id.toString(), 
      texto: post.lembrete || '',
      tituloModal: isEditing ? 'Editar Lembrete' : 'Adicionar Lembrete',
      postTitulo: post.titulo
    });
    setErroLembrete('');
  };

  const handleFecharLembreteModal = () => {
    setLembreteModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleSalvarLembrete = async (e) => {
    e.preventDefault();
    if (!lembreteModal.postId) return;

    const novoLembrete = lembreteModal.texto.trim();

    try {
      setErroLembrete('');
      
      // Tenta salvar na API primeiro
      try {
        await apiService.atualizarPost(lembreteModal.postId, { lembrete: novoLembrete });
      } catch (apiError) {
        console.log("API não disponível, salvando localmente:", apiError);
        // Se a API falhar, salva localmente
        LembreteService.salvarLembrete(lembreteModal.postId, novoLembrete);
      }

      // Atualiza a UI
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id.toString() === lembreteModal.postId.toString() 
            ? { ...post, lembrete: novoLembrete } 
            : post
        )
      );

      // Atualiza lembretes locais
      setLembretesLocais(prev => ({
        ...prev,
        [lembreteModal.postId]: { texto: novoLembrete }
      }));

      handleFecharLembreteModal();
      
    } catch (error) {
      console.error("Erro ao salvar lembrete:", error);
      setErroLembrete("Erro ao salvar lembrete. Tente novamente.");
    }
  };

  const handleExcluirLembrete = async (postId) => {
    try {
      // Tenta excluir da API
      try {
        await apiService.atualizarPost(postId, { lembrete: '' });
      } catch (apiError) {
        console.log("API não disponível, excluindo localmente:", apiError);
        // Se a API falhar, exclui localmente
        LembreteService.deletarLembrete(postId);
      }

      // Atualiza a UI
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id.toString() === postId.toString() 
            ? { ...post, lembrete: '' } 
            : post
        )
      );

      // Atualiza lembretes locais
      setLembretesLocais(prev => {
        const newLembretes = { ...prev };
        delete newLembretes[postId];
        return newLembretes;
      });

    } catch (error) {
      console.error("Erro ao excluir lembrete:", error);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {erro && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{erro}</p>
            <p className="text-red-600 text-sm mt-1">
              Certifique-se de que o JSON Server está rodando na porta 3001
            </p>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo de volta, {usuario?.nome || 'Usuário'}!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Posts</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.total}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <PlusIcon />
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
                <ChartIcon />
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
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">
                        {post.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.conteudo}
                      </p>
                      {post.lembrete && (
                        <div className="mt-2 flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center">
                            <BellIcon />
                            <span className="text-sm text-yellow-800 font-medium ml-2">
                              Lembrete: {post.lembrete}
                            </span>
                          </div>
                          <button
                            onClick={() => handleExcluirLembrete(post.id)}
                            className="text-yellow-600 hover:text-yellow-800 text-xs font-medium"
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <button
                        onClick={() => handleAbrirLembreteModal(post)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                          post.lembrete 
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {post.lembrete ? 'Editar Lembrete' : 'Adicionar Lembrete'}
                      </button>

                      {post.imagemUrl && (
                        <img
                          src={post.imagemUrl}
                          alt="Post"
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
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

      {lembreteModal.isOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleFecharLembreteModal}>
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{lembreteModal.tituloModal}</h3>
              <button 
                onClick={handleFecharLembreteModal} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Post: <span className="font-semibold">{lembreteModal.postTitulo}</span>
              </p>
            </div>
            
            <form onSubmit={handleSalvarLembrete}>
              <textarea
                value={lembreteModal.texto}
                onChange={(e) => setLembreteModal({ ...lembreteModal, texto: e.target.value })}
                placeholder="Ex: Não esquecer de analisar o feedback..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 mb-4 resize-none"
                rows="4"
              />
              {erroLembrete && <p className="text-red-500 text-sm mb-2">{erroLembrete}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleFecharLembreteModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Salvar Lembrete
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <MobileNav location={location} />
    </div>
  );
};

export default Dashboard;