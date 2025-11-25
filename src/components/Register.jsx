import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/usuarios');
      const usuarios = await res.json();

      const emailExistente = usuarios.find(usuario => usuario.email === email);
      if (emailExistente) {
        Swal.fire({
          title: "Atenção!",
          text: "Esse e-mail já está cadastrado!",
          icon: "warning"
        });
        setLoading(false);
        return;
      }

      const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

      const newUser = { 
        id: novoId, 
        nome, 
        email, 
        senha,
        foto: "",
        estatisticas: {
          engajamento: "0",
          alcance: "0"
        }
      };

      const createRes = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (createRes.ok) {
        await fetch('http://localhost:3001/estatisticas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: novoId,
            usuarioId: novoId,
            engajamento: "0",
            alcance: "0"
          })
        });

        Swal.fire({
          title: "Bom trabalho!",
          text: "Cadastro realizado com sucesso!",
          icon: "success"
        });

        localStorage.setItem("usuarioLogado", JSON.stringify(newUser));
        navigate('/dashboard');
      } else {
        throw new Error('Erro ao criar usuário');
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível cadastrar. Tente novamente.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 via-blue-900 to-blue-700 p-4">
      <div className="w-full max-w-sm rounded-xl p-8 shadow-xl text-center bg-white">
        
        <img src="/logopostai.png" alt="Logo" className="w-32 mx-auto mb-6 select-none" />
        <h1 className="text-gray-900 text-2xl font-semibold mb-1">PostAí</h1>
        <p className="text-gray-600 text-sm mb-6">
          Automação inteligente para suas redes sociais
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Registre-se'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Voltar para login
          </button>
        </form>
      </div>
    </div>
  );
}