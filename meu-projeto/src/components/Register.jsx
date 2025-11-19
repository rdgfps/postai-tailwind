import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/usuarios?email=${email}`);
      const existingUser = await res.json();

      if (existingUser.length > 0) {
        Swal.fire({
          title: "Atenção!",
          text: "Esse e-mail já está cadastrado!",
          icon: "warning"
        });
        return;
      }

      const newUser = { nome, email, senha };

      await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      Swal.fire({
        title: "Bom trabalho!",
        text: "Cadastro realizado com sucesso!",
        icon: "success"
      });

      navigate('/');
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível cadastrar. Tente novamente.",
        icon: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center    p-4">
      {/* Card centralizado */}
      <div className="w-full max-w-sm rounded-xl p-8 shadow-xl text-center bg-custom-bg backdrop-blur-sm">
        
        <img src="/logopostai.png" alt="Logo" className="w-32 mx-auto mb-6 select-none" />
        <h1 className="text-black text-2xl font-semibold mb-1">PostAí</h1>
        <p className="text-black-200 text-sm mb-6">
          Automação inteligente para suas redes sociais
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/15 text-black placeholder-black border border-black/20 focus:ring-2 focus:ring-black/70 outline-none"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray/15 text-black placeholder-black border border-black/20 focus:ring-2 focus:ring-black/70 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray/15 text-black placeholder-black border border-black/20 focus:ring-2 focus:ring-black/70 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-black rounded-lg font-semibold hover:bg-blue-500 transition mt-3"
          >
            Registre-se
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-3 bg-white/15 text-black border border-white/40 rounded-lg font-semibold hover:bg-black/25 transition"
          >
            Voltar para login
          </button>
        </form>
      </div>
    </div>
  );
}
