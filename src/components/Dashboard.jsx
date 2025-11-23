// components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({ 
    nome: "", 
    foto: "",
    email: ""
  });
  const [postsAgendados, setPostsAgendados] = useState(0);
  const [postsPublicados, setPostsPublicados] = useState(0);
  const [engajamento, setEngajamento] = useState("0");
  const [alcance, setAlcance] = useState("0");
  const [atividadesRecentes, setAtividadesRecentes] = useState([]);
  const [proximosAgendamentos, setProximosAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Verificar se usuário está logado
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      navigate("/");
      return;
    }

    const userData = JSON.parse(usuarioLogado);
    setPerfil({
      nome: userData.nome || "",
      foto: userData.foto || "",
      email: userData.email || ""
    });
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (!usuarioLogado) return;

      try {
        setLoading(true);
        setError("");
        
        const userData = JSON.parse(usuarioLogado);
        const userId = userData.id;

        console.log("Buscando dados para usuário ID:", userId);

        // Buscar dados do usuário, posts e estatísticas
        const [userRes, postsRes, statsRes] = await Promise.allSettled([
          fetch(`http://localhost:3001/usuarios/${userId}`),
          fetch(`http://localhost:3001/posts?usuarioId=${userId}`),
          fetch(`http://localhost:3001/estatisticas?usuarioId=${userId}`)
        ]);

        let userDataFromApi = userData;
        let postsData = [];
        let statsData = [];

        // Processar resposta do usuário
        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          userDataFromApi = await userRes.value.json();
          console.log("Dados do usuário:", userDataFromApi);
        }

        // Processar resposta dos posts
        if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
          const postsResponse = await postsRes.value.json();
          console.log("Resposta posts:", postsResponse);
          
          // Se for um array, usar diretamente
          if (Array.isArray(postsResponse)) {
            postsData = postsResponse;
          } else {
            // Se for um objeto, tentar extrair posts
            postsData = postsResponse.posts || postsResponse.data || [];
          }
        }

        // Processar resposta das estatísticas
        if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
          const statsResponse = await statsRes.value.json();
          console.log("Resposta estatísticas:", statsResponse);
          
          if (Array.isArray(statsResponse)) {
            statsData = statsResponse;
          } else {
            statsData = [statsResponse];
          }
        }

        // Atualizar perfil
        setPerfil(prev => ({
          ...prev,
          nome: userDataFromApi.nome || prev.nome,
          foto: userDataFromApi.foto || prev.foto,
          email: userDataFromApi.email || prev.email
        }));

        // Calcular posts agendados e publicados
        const agendados = postsData.filter((p) => p.status === "agendado" || p.agendado).length;
        const publicados = postsData.filter((p) => p.status === "publicado" || p.publicado).length;

        console.log("Posts agendados:", agendados, "Posts publicados:", publicados);

        setPostsAgendados(agendados);
        setPostsPublicados(publicados);

        // Usar estatísticas ou valores padrão
        const estatisticas = statsData[0] || {};
        console.log("Estatísticas encontradas:", estatisticas);

        setEngajamento(estatisticas.engajamento || "1.2K");
        setAlcance(estatisticas.alcance || "15.7K");

        // Processar atividades recentes (últimos 5 posts)
        const atividades = postsData
          .sort((a, b) => new Date(b.data || b.createdAt) - new Date(a.data || a.createdAt))
          .slice(0, 5)
          .map(post => ({
            id: post.id,
            titulo: post.titulo || post.conteudo?.substring(0, 30) + '...' || 'Post sem título',
            plataforma: post.plataforma || 'Instagram',
            status: post.status || 'rascunho',
            data: post.data || post.createdAt
          }));

        setAtividadesRecentes(atividades);

        // Processar próximos agendamentos (posts agendados para o futuro)
        const hoje = new Date();
        const agendamentos = postsData
          .filter(post => post.status === 'agendado' && new Date(post.data) > hoje)
          .sort((a, b) => new Date(a.data) - new Date(b.data))
          .slice(0, 5)
          .map(post => ({
            id: post.id,
            data: post.data,
            titulo: post.titulo || post.conteudo?.substring(0, 30) + '...' || 'Post agendado',
            plataforma: post.plataforma || 'Twitter',
            status: 'agendado'
          }));

        setProximosAgendamentos(agendamentos);

      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        setError("Não foi possível carregar os dados completos. Usando dados de exemplo.");
        
        // Usar dados básicos do localStorage
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (usuarioLogado) {
          const userData = JSON.parse(usuarioLogado);
          setPerfil({
            nome: userData.nome || "Usuário",
            foto: userData.foto || "",
            email: userData.email || ""
          });
        }
        // Valores padrão para demonstração
        setPostsAgendados(1);
        setPostsPublicados(2);
        setEngajamento("1.2K");
        setAlcance("15.7K");
        
        // Dados de exemplo para atividades
        setAtividadesRecentes([
          { id: 1, titulo: "Post no Instagram", plataforma: "Instagram", status: "publicado", data: "2024-01-15" },
          { id: 2, titulo: "Story no Facebook", plataforma: "Facebook", status: "agendado", data: "2024-01-20" },
          { id: 3, titulo: "Tweet no Twitter", plataforma: "Twitter", status: "rascunho", data: "2024-01-18" }
        ]);

        setProximosAgendamentos([
          { id: 2, data: "2024-01-20T10:00:00", titulo: "Twitter Post", plataforma: "Twitter", status: "agendado" },
          { id: 4, data: "2024-01-19T15:30:00", titulo: "LinkedIn Article", plataforma: "LinkedIn", status: "agendado" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    if (data.toDateString() === hoje.toDateString()) {
      return `Hoje, ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (data.toDateString() === amanha.toDateString()) {
      return `Amanhã, ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return data.toLocaleDateString('pt-BR', { 
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'publicado':
        return 'text-green-600 bg-green-100';
      case 'agendado':
        return 'text-blue-600 bg-blue-100';
      case 'rascunho':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'publicado':
        return 'Publicado';
      case 'agendado':
        return 'Agendado';
      case 'rascunho':
        return 'Rascunho';
      default:
        return status;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto p-5 pb-24 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-5 pb-24">
      <div className="flex justify-between items-center mb-8 pb-5 border-b border-gray-200">
        <div className="flex items-center">
          {perfil.foto ? (
            <img
              src={perfil.foto}
              alt={`Foto de perfil de ${perfil.nome}`}
              className="w-12 h-12 rounded-full border-2 border-orange-500 object-cover mr-4"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mr-4">
              {perfil.nome.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold">Boas-vindas, {perfil.nome}!</h1>
            <p className="text-sm text-gray-500">Aqui estão seus dados de performance.</p>
            {perfil.email && (
              <p className="text-xs text-gray-400">{perfil.email}</p>
            )}
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors inline-block w-fit left-0"
        >
          Sair
        </button>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <StatCard value={postsAgendados} label="Agendados" />
        <StatCard value={postsPublicados} label="Publicados" />
        <StatCard value={engajamento} label="Engajamento" />
        <StatCard value={alcance} label="Alcance" />
      </div>

      {/* Conteúdo Adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Atividade Recente */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            {atividadesRecentes.length > 0 ? (
              atividadesRecentes.map((atividade) => (
                <div key={atividade.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      atividade.status === 'publicado' ? 'bg-green-500' :
                      atividade.status === 'agendado' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <span className="text-gray-700 block">{atividade.titulo}</span>
                      <span className="text-gray-600 block">{atividade.conteudo}</span>
                      <span className="text-gray-500 text-xs">{atividade.plataforma}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(atividade.status)}`}>
                    {getStatusText(atividade.status)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhuma atividade recente</p>
            )}
          </div>
        </div>

        {/* Próximos Agendamentos */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximos Agendamentos</h2>
          <div className="space-y-3">
            {proximosAgendamentos.length > 0 ? (
              proximosAgendamentos.map((agendamento) => (
                <div key={agendamento.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <span className="text-gray-700 font-medium block">
                      {formatarData(agendamento.data)}
                    </span>
                    <p className="text-gray-500 text-sm">{agendamento.titulo}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                    {agendamento.data && new Date(agendamento.data) < new Date(Date.now() + 24 * 60 * 60 * 1000) 
                      ? "Em breve" 
                      : "Agendado"
                    }
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhum agendamento próximo</p>
            )}
          </div>
        </div>
      </div>

      {/* Dicas Rápidas */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Dica do Dia</h2>
        <p className="text-orange-100">
          {postsAgendados === 0 
            ? "Comece agendando seus primeiros posts para manter uma presença consistente nas redes sociais!"
            : `Você tem ${postsAgendados} posts agendados. Continue planejando seu conteúdo!`
          }
        </p>
      </div>

      <MobileNav location={location} />
    </div>
  );
};

export default Dashboard;