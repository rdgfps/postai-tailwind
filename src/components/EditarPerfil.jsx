import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    bio: "",
    foto: ""
  });

  const [loading, setLoading] = useState(false);

  // Carregar dados do usuário
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (!usuarioLogado) {
          navigate("/");
          return;
        }

        const userData = JSON.parse(usuarioLogado);
        const userId = userData.id;

        // Verificar se o userId é válido
        if (!userId || userId === "null" || userId === "undefined") {
          console.error("ID de usuário inválido");
          Swal.fire("Erro", "ID de usuário inválido", "error");
          navigate("/perfil");
          return;
        }

        // Buscar dados atualizados do usuário
        const response = await fetch(`http://localhost:3001/usuarios/${userId}`);
        
        if (!response.ok) {
          throw new Error("Usuário não encontrado");
        }

        const usuario = await response.json();
        
        setFormData({
          nome: usuario.nome || "",
          email: usuario.email || "",
          bio: usuario.bio || "",
          foto: usuario.foto || ""
        });

      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        Swal.fire({
          title: "Erro",
          text: "Não foi possível carregar os dados do perfil.",
          icon: "error",
          confirmButtonColor: "#f97316",
        }).then(() => {
          navigate("/perfil");
        });
      }
    };

    carregarUsuario();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (!usuarioLogado) {
        navigate("/");
        return;
      }

      const userData = JSON.parse(usuarioLogado);
      const userId = userData.id;

      // Verificar se o userId é válido
      if (!userId || userId === "null" || userId === "undefined") {
        console.error("ID de usuário inválido");
        Swal.fire("Erro", "ID de usuário inválido", "error");
        return;
      }

      // Validações básicas
      if (!formData.nome.trim()) {
        Swal.fire({
          title: "Campo obrigatório",
          text: "Por favor, preencha o nome.",
          icon: "warning",
          confirmButtonColor: "#f97316",
        });
        return;
      }

      if (!formData.email.trim()) {
        Swal.fire({
          title: "Campo obrigatório",
          text: "Por favor, preencha o email.",
          icon: "warning",
          confirmButtonColor: "#f97316",
        });
        return;
      }

      // Buscar usuário existente
      const response = await fetch(`http://localhost:3001/usuarios/${userId}`);
      
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }

      const usuarioExistente = await response.json();

      const usuarioAtualizado = {
        ...usuarioExistente,
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        bio: formData.bio.trim(),
        foto: formData.foto.trim()
      };

      const updateResponse = await fetch(`http://localhost:3001/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioAtualizado),
      });

      if (!updateResponse.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      // Atualizar localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
      
      Swal.fire({
        title: "Sucesso!",
        text: "Perfil atualizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#f97316",
      }).then(() => {
        navigate("/perfil");
      });

    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      Swal.fire({
        title: "Erro",
        text: "Não foi possível atualizar o perfil. Verifique se o servidor está rodando.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
            <p className="text-gray-600 mt-2">
              Atualize suas informações pessoais
            </p>
          </div>

          {/* Formulário */}
          <div className="space-y-6">
            {/* Foto do Perfil */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Foto do Perfil (URL)
              </label>
              <input
                type="url"
                name="foto"
                value={formData.foto}
                onChange={handleChange}
                placeholder="https://exemplo.com/sua-foto.jpg"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
              />
              {formData.foto && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Prévia:</p>
                  <img
                    src={formData.foto}
                    alt="Prévia da foto"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Nome */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Conte um pouco sobre você..."
                rows="4"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition resize-vertical"
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;