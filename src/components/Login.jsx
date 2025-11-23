// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    const email = e.target.email.value;
    const senha = e.target.senha.value;

    try {
      // Buscar todos os usuários
      const res = await fetch('http://localhost:3001/usuarios');
      const todosUsuarios = await res.json();

      // Filtrar manualmente por email e senha
      const usuarioEncontrado = todosUsuarios.find(
        usuario => usuario.email === email && usuario.senha === senha
      );

      if (!usuarioEncontrado) {
        setErro("E-mail ou senha incorretos!");
        setLoading(false);
        return;
      }

      // Salvar usuário no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-b from-blue-500 via-blue-900 to-blue-700 p-5">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center transition-transform duration-300 hover:scale-105 sm:max-w-sm sm:p-8">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <img src="/logopostai.png" alt="Logo" className="max-w-36 h-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-1 text-gray-900">Bem-vindo ao PostAí</h1>
          <p className="text-gray-600 text-sm">Automação inteligente para redes sociais</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col">
          {erro && <p className="text-red-500 text-sm mb-3 font-semibold">{erro}</p>}

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            className="p-3.5 mb-4 border border-gray-300 rounded-lg text-base transition-all duration-300 text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            required
            className="p-3.5 mb-4 border border-gray-300 rounded-lg text-base transition-all duration-300 text-black placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="p-3.75 bg-orange-500 p-1.5 text-white border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 active:scale-99 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="p-3.75 bg-blue-500 p-1.5 text-white border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-600 active:scale-99 mt-1"
          >
            Registre-se
          </button>
        </form>
      </div>
    </div>
  );
}