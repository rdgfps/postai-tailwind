  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';

  export default function Login() {
    const navigate = useNavigate();
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      const senha = e.target.senha.value;

      try {
        const res = await fetch(`http://localhost:3001/usuarios?email=${email}&senha=${senha}`);
        const usuariosEncontrados = await res.json();

        if (usuariosEncontrados.length === 0) {
          setErro("E-mail ou senha incorretos!");
          return;
        }

        const usuarioLogado = usuariosEncontrados[0];

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        setErro("Erro ao conectar com o servidor.");
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
              className="p-3.5 mb-4 border border-black-300 rounded-lg text-base transition-all duration-300 text-black placeholder:text-black focus:border-black-500 focus:ring-2 focus:ring-black-200 focus:outline-none"
            />

            <input
              type="password"
              name="senha"
              placeholder="Senha"
              required
              className="p-3.5 mb-4 border border-black-300 rounded-lg text-base transition-all duration-300 text-black placeholder:text-black focus:border-black-500 focus:ring-2 focus:ring-black-200 focus:outline-none"
            />

            <button
              type="submit"
              className="p-3.75 bg-orange-500 text-white border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 active:scale-99 mt-1 block text-center"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="p-3.75 bg-blue-500 text-white border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-blue-600 active:scale-99 mt-1 block text-center"
            >
              Registre-se
            </button>
          </form>
        </div>
      </div>
    );
  }
