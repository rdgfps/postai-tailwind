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

  useEffect(() => {
    const carregarUsuario = () => {
      try {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (!usuarioLogado) {
          navigate("/");
          return;
        }

        const userData = JSON.parse(usuarioLogado);
        
        setFormData({
          nome: userData.nome || "",
          email: userData.email || "",
          bio: userData.bio || "",
          foto: userData.foto || ""
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

      const usuarioAtualizado = {
        ...userData,
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        bio: formData.bio.trim(),
        foto: formData.foto.trim(),
        atualizadoEm: new Date().toISOString()
      };

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
        text: "Não foi possível atualizar o perfil.",
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

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          foto: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
            <p className="text-gray-600 mt-2">
              Atualize suas informações pessoais
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Foto do Perfil
              </label>
              
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.foto ? (
                      <img
                        src={formData.foto}
                        alt="Foto do perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-600">
                        {formData.nome?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoUpload}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  <p className="text-xs text-gray-500">
                    Ou insira uma URL da imagem:
                  </p>
                  <input
                    type="url"
                    name="foto"
                    value={formData.foto}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/sua-foto.jpg"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

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

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
              
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50"
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