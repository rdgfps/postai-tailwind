import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postService } from './PostService';

const plataformasOptions = [
  { id: "instagram", name: "Instagram", icon: "../instagram.png", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "facebook", name: "Facebook", icon: "../facebook.png", color: "bg-gradient-to-r from-blue-600 to-blue-800" },
  { id: "twitter", name: "Twitter", icon: "../twitter.png", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: "../linkedin.png", color: "bg-gradient-to-r from-blue-700 to-blue-900" },
  { id: "tiktok", name: "TikTok", icon: "../tiktok.png", color: "bg-gradient-to-r from-black to-gray-800" },
];

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

const CriarPost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    conteudo: "",
    plataformas: [],
    dataAgendamento: "",
    horarioAgendamento: "",
    imagemUrl: "",
    status: "publicado",
  });

  const [modoAgendamento, setModoAgendamento] = useState(false);

  React.useEffect(() => {
    postService.verificarEPublicarPostsAgendados();
    const interval = setInterval(postService.verificarEPublicarPostsAgendados, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlataformaChange = (plataformaId) => {
    setFormData((prev) => ({
      ...prev,
      plataformas: prev.plataformas.includes(plataformaId)
        ? prev.plataformas.filter((p) => p !== plataformaId)
        : [...prev.plataformas, plataformaId],
    }));
  };

  const toggleModoAgendamento = () => {
    setModoAgendamento(!modoAgendamento);
    if (modoAgendamento) {
      setFormData(prev => ({
        ...prev,
        dataAgendamento: "",
        horarioAgendamento: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.conteudo) {
      Swal.fire({
        title: "Campos obrigatórios",
        text: "Por favor, preencha pelo menos o título e conteúdo do post.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    try {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (!usuarioLogado) {
        navigate("/");
        return;
      }

      const userData = JSON.parse(usuarioLogado);
      const userId = userData.id;

      const postsResponse = await fetch("http://localhost:3001/posts");
      const postsExistentes = await postsResponse.json();

      const novoId =
        postsExistentes.length > 0
          ? Math.max(...postsExistentes.map((p) => p.id)) + 1
          : 1;

      let dataAgendamentoCompleta = null;
      let status = "publicado";

      if (modoAgendamento && formData.dataAgendamento && formData.horarioAgendamento) {
        dataAgendamentoCompleta = `${formData.dataAgendamento}T${formData.horarioAgendamento}:00`;
        status = "agendado";
        const dataAgendada = new Date(dataAgendamentoCompleta);
        const agora = new Date();
        if (dataAgendada <= agora) {
          Swal.fire({
            title: "Data inválida",
            text: "A data e horário de agendamento devem ser futuros.",
            icon: "warning",
            confirmButtonColor: "#f97316",
          });
          return;
        }
      }

      const postsParaSalvar = formData.plataformas.map((plataforma, index) => ({
        id: novoId + index,
        usuarioId: userId,
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        plataforma: plataforma,
        status: status,
        data: dataAgendamentoCompleta || new Date().toISOString(),
        imagemUrl: formData.imagemUrl || "",
        createdAt: new Date().toISOString(),
        agendadoEm: status === "agendado" ? new Date().toISOString() : null,
      }));

      if (postsParaSalvar.length === 0) {
        postsParaSalvar.push({
          id: novoId,
          usuarioId: userId,
          titulo: formData.titulo,
          conteudo: formData.conteudo,
          plataforma: "instagram",
          status: status,
          data: dataAgendamentoCompleta || new Date().toISOString(),
          imagemUrl: formData.imagemUrl || "",
          createdAt: new Date().toISOString(),
          lembrete: formData.lembrete || "",
          agendadoEm: status === "agendado" ? new Date().toISOString() : null,
        });
      }

      const savePromises = postsParaSalvar.map((post) =>
        fetch("http://localhost:3001/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
      );

      const results = await Promise.all(savePromises);
      const allSuccessful = results.every((result) => result.ok);

      if (allSuccessful) {
        await postService.verificarEPublicarPostsAgendados();
        Swal.fire({
          title: "Sucesso!",
          text:
            status === "agendado"
              ? `Post${postsParaSalvar.length > 1 ? 's' : ''} agendado${postsParaSalvar.length > 1 ? 's' : ''} com sucesso!`
              : `Post${postsParaSalvar.length > 1 ? 's' : ''} publicado${postsParaSalvar.length > 1 ? 's' : ''} com sucesso!`,
          icon: "success",
          confirmButtonColor: "#f97316",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        throw new Error("Erro ao salvar alguns posts");
      }
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Não foi possível salvar o post. Tente novamente.",
        icon: "error",
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="h-auto w-auto xl-auto mx-auto p-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-900">
                Título do Post
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Digite um título criativo para seu post..."
                className="w-full p-4 border-2 text-gray-800 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition text-lg placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-900">
                Conteúdo
              </label>
              <textarea
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
                placeholder="Compartilhe suas ideias..."
                rows="6"
                className="w-full p-4 border-2 text-gray-800 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition resize-vertical text-lg placeholder-gray-400 leading-relaxed"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900">
                Plataformas
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {plataformasOptions.map((plataforma) => (
                  <div
                    key={plataforma.id}
                    onClick={() => handlePlataformaChange(plataforma.id)}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      formData.plataformas.includes(plataforma.id)
                        ? "scale-105 shadow-lg"
                        : "hover:scale-105"
                    }`}
                  >
                    <div className={`${plataforma.color} rounded-xl p-4 text-white shadow-md`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={plataforma.icon}
                            alt={plataforma.name}
                            className="w-8 h-8 object-contain bg-white rounded-lg p-1"
                          />
                          <span className="font-semibold">
                            {plataforma.name}
                          </span>
                        </div>

                        {formData.plataformas.includes(plataforma.id) && (
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Agendamento
                </h3>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={modoAgendamento}
                      onChange={toggleModoAgendamento}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${
                      modoAgendamento ? 'bg-orange-500' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      modoAgendamento ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Agendar post
                  </span>
                </label>
              </div>

              {modoAgendamento && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Data de Publicação
                    </label>
                    <input
                      type="date"
                      name="dataAgendamento"
                      value={formData.dataAgendamento}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3 border-2 text-gray-800 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                      required={modoAgendamento}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Horário
                    </label>
                    <input
                      type="time"
                      name="horarioAgendamento"
                      value={formData.horarioAgendamento}
                      onChange={handleChange}
                      className="w-full p-3 border-2 text-gray-800 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                      required={modoAgendamento}
                    />
                  </div>
                </div>
              )}

              {!modoAgendamento && (
                <p className="text-green-600 font-medium text-center py-2">
                  Post será publicado imediatamente
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-900">
                Imagem do Post (URL)
              </label>
              <input
                type="url"
                name="imagemUrl"
                value={formData.imagemUrl}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem-incrivel.jpg"
                className="w-full p-4 border-2 text-gray-800 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition text-lg placeholder-gray-400"
              />
            </div>

            {formData.imagemUrl && (
              <div className="space-y-3">
                <label className="block text-lg font-semibold text-gray-900">
                  Prévia da Imagem
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50">
                  <img
                    src={formData.imagemUrl}
                    alt="Prévia do post"
                    className="max-w-full h-auto rounded-lg mx-auto max-h-80 object-cover shadow-md"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div className="hidden text-center text-gray-500 py-8">
                    <p>Não foi possível carregar a imagem</p>
                    <p className="text-sm">
                      Verifique se a URL está correta
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {modoAgendamento ? "Agendar Post" : "Publicar Agora"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gray-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-600 transition shadow-lg hover:shadow-xl"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <MobileNav location={location} />
    </div>
  );
};

export default CriarPost;
