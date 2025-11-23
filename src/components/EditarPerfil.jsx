import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    foto: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

        // Buscar dados do usuário da API
        const response = await fetch(`http://localhost:3001/usuarios/${userId}`);
        
        if (response.ok) {
          const userDataFromApi = await response.json();
          setPerfil({
            nome: userDataFromApi.nome || '',
            email: userDataFromApi.email || '',
            foto: userDataFromApi.foto || '',
            bio: userDataFromApi.bio || ''
          });
        } else {
          // Se não encontrar na API, usar dados do localStorage
          setPerfil({
            nome: userData.nome || '',
            email: userData.email || '',
            foto: userData.foto || '',
            bio: userData.bio || ''
          });
        }

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        // Usar dados do localStorage como fallback
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (usuarioLogado) {
          const userData = JSON.parse(usuarioLogado);
          setPerfil({
            nome: userData.nome || '',
            email: userData.email || '',
            foto: userData.foto || '',
            bio: userData.bio || ''
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!perfil.nome.trim() || !perfil.email.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Nome e email são obrigatórios.',
        confirmButtonColor: '#f97316'
      });
      return;
    }

    try {
      setSaving(true);

      // Buscar usuário logado
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (!usuarioLogado) {
        navigate("/");
        return;
      }

      const userData = JSON.parse(usuarioLogado);
      const userId = userData.id;

      // Atualizar no db.json
      const response = await fetch(`http://localhost:3001/usuarios/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: perfil.nome,
          email: perfil.email,
          foto: perfil.foto,
          bio: perfil.bio
        })
      });

      if (response.ok) {
        // Atualizar localStorage com dados atualizados
        const updatedUser = {
          ...userData,
          nome: perfil.nome,
          email: perfil.email,
          foto: perfil.foto,
          bio: perfil.bio
        };
        localStorage.setItem("usuarioLogado", JSON.stringify(updatedUser));

        Swal.fire({
          icon: 'success',
          title: 'Perfil atualizado!',
          text: 'As alterações foram salvas com sucesso.',
          confirmButtonColor: '#f97316'
        }).then(() => navigate('/perfil'));
      } else {
        throw new Error('Erro ao atualizar perfil');
      }

    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível salvar as alterações. Tente novamente.',
        confirmButtonColor: '#f97316'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/perfil');
  };

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
          <p className="text-gray-600 mt-2">Atualize suas informações pessoais</p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          
          {/* Foto de Perfil */}
          <div className="text-center">
            <div className="flex flex-col items-center space-y-4">
              {perfil.foto ? (
                <img 
                  src={perfil.foto} 
                  alt="Foto de perfil" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold border-4 border-orange-600 shadow-md">
                  {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  URL da Foto
                </label>
                <input
                  type="url"
                  name="foto"
                  placeholder="https://exemplo.com/foto.jpg"
                  value={perfil.foto}
                  onChange={handleChange}
                  className="w-full p-3 border-2 text-gray-800 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />
                <p className="text-xs text-gray-500 mt-1 text-left">
                  Cole a URL de uma imagem para sua foto de perfil
                </p>
              </div>
            </div>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="nome"
              value={perfil.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className="w-full p-3 border-2 text-gray-800 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={perfil.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full p-3 border-2 text-gray-800 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col space-y-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || !perfil.nome.trim() || !perfil.email.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            
            <button
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </div>

        {/* Informações */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            * Campos obrigatórios
          </p>
        </div>
      </div>
    </div>
  );
}