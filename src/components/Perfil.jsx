import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

const Perfil = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    nome: 'Usuário',
    email: 'usuario@email.com',
    foto: '', 
    posts: 0,
    seguidores: 0,
    engajamento: '0%',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Verificar se usuário está logado
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (!usuarioLogado) {
          navigate("/");
          return;
        }

        const userData = JSON.parse(usuarioLogado);
        const userId = userData.id;

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
        }

        // Processar resposta dos posts
        if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
          const postsResponse = await postsRes.value.json();
          if (Array.isArray(postsResponse)) {
            postsData = postsResponse;
          } else {
            postsData = postsResponse.posts || postsResponse.data || [];
          }
        }

        // Processar resposta das estatísticas
        if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
          const statsResponse = await statsRes.value.json();
          if (Array.isArray(statsResponse)) {
            statsData = statsResponse;
          } else {
            statsData = [statsResponse];
          }
        }

        // Calcular total de posts
        const totalPosts = postsData.length;

        // Usar estatísticas ou valores padrão
        const estatisticas = statsData[0] || {};
        
        // Calcular seguidores baseado no alcance (exemplo: 1K alcance = 100 seguidores)
        const alcance = estatisticas.alcance || "0";
        let seguidores = 0;
        
        if (alcance.includes('K')) {
          seguidores = Math.round(parseFloat(alcance) * 10); // 1K alcance = ~100 seguidores
        } else if (alcance.includes('M')) {
          seguidores = Math.round(parseFloat(alcance) * 10000); // 1M alcance = ~10K seguidores
        } else {
          seguidores = parseInt(alcance) / 10 || 0;
        }

        // Calcular engajamento baseado nos dados
        const engajamentoValue = estatisticas.engajamento || "0";
        let engajamento = '0%';
        
        if (engajamentoValue.includes('K')) {
          const engNum = parseFloat(engajamentoValue);
          engajamento = engNum > 1 ? `${Math.round(engNum / 10)}%` : '1%';
        } else {
          engajamento = parseInt(engajamentoValue) > 100 ? '5%' : '1%';
        }

        setUser({
          nome: userDataFromApi.nome || userData.nome || "Usuário",
          email: userDataFromApi.email || userData.email || "usuario@email.com",
          foto: userDataFromApi.foto || userData.foto || "",
          posts: totalPosts,
          seguidores: Math.max(seguidores, 0), // Garantir que não seja negativo
          engajamento: engajamento,
        });

      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
        setError("Não foi possível carregar os dados do perfil.");
        
        // Usar dados do localStorage como fallback
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (usuarioLogado) {
          const userData = JSON.parse(usuarioLogado);
          setUser({
            nome: userData.nome || "Usuário",
            email: userData.email || "usuario@email.com",
            foto: userData.foto || "",
            posts: 0,
            seguidores: 0,
            engajamento: '0%',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="w-full max-w-4xl mx-auto p-6">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
        </header>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Card de Informações do Usuário */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col items-center text-center">
            
            {/* Avatar */}
            <div className="mb-6">
              {user.foto ? (
                <img 
                  src={user.foto} 
                  alt="Foto de Perfil" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-orange-500 text-white flex items-center justify-center text-4xl font-bold border-4 border-orange-600 shadow-lg">
                  {getInitials(user.nome)}
                </div>
              )}
            </div>
            
            {/* Informações Básicas */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.nome}</h2>
            <p className="text-gray-600 mb-6">{user.email}</p>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-8 w-full max-w-md">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">{user.posts}</p>
                <p className="text-gray-600 text-sm font-medium">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">{user.seguidores}</p>
                <p className="text-gray-600 text-sm font-medium">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">{user.engajamento}</p>
                <p className="text-gray-600 text-sm font-medium">Engajamento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Opções do Perfil */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <ProfileOption icon={AiOutlineEdit} label="Editar Perfil" to="/editar-perfil" />
          <ProfileOption icon={FaRegUserCircle} label="Contas Conectadas" to="/perfil/contas" />
          <ProfileOption icon={AiOutlineBell} label="Notificações" to="/configuracoes" />
          <ProfileOption icon={AiOutlineSetting} label="Ajuda e Suporte" to="/suporte" />
        </div>
      </div>

      {/* Navegação Mobile */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center z-50 md:hidden">
        <Link to="/dashboard" className={`flex flex-col items-center justify-center ${location.pathname === '/dashboard' ? 'text-orange-500' : 'text-gray-500'} p-3 transition hover:text-orange-400`}>
          <AiFillHome className="text-2xl" />
          <span className="text-xs mt-1">Início</span>
        </Link>
        <Link to="/analytics" className={`flex flex-col items-center justify-center ${location.pathname === '/analytics' ? 'text-orange-500' : 'text-gray-500'} p-3 transition hover:text-orange-400`}>
          <AiOutlineBarChart className="text-2xl" />
          <span className="text-xs mt-1">Estatísticas</span>
        </Link>
        <Link to="/criar-post" className={`flex flex-col items-center justify-center ${location.pathname === '/criar-post' ? 'text-orange-500' : 'text-gray-500'} p-3 transition hover:text-orange-400`}>
          <AiOutlinePlusCircle className="text-2xl" />
          <span className="text-xs mt-1">Criar</span>
        </Link>
        <Link to="/perfil" className={`flex flex-col items-center justify-center ${location.pathname === '/perfil' ? 'text-orange-500' : 'text-gray-500'} p-3 transition hover:text-orange-400`}>
          <AiOutlineUser className="text-2xl" />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

// Adicione estes estilos CSS no seu arquivo de estilos ou como styled-components
const styles = `
.profile-option {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #374151;
}

.profile-option:hover {
  background-color: #f9fafb;
  color: #f97316;
}

.profile-option:last-child {
  border-bottom: none;
}

.option-icon {
  font-size: 1.5rem;
  margin-right: 12px;
}

.profile-option span {
  font-size: 1rem;
  font-weight: 500;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Perfil;