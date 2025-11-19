import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/EditarPerfil.css';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nome: '',
    usuario: '',
    bio: '',
    engajamento: '',
    alcance: '',
    foto: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('perfil')) || {};
    setPerfil(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('perfil', JSON.stringify(perfil));
    Swal.fire({
      icon: 'success',
      title: 'Perfil atualizado!',
      text: 'As alterações foram salvas com sucesso.',
      confirmButtonColor: '#4CAF50'
    }).then(() => navigate('/dashboard'));
  };

  return (
    <div className="editarperfil-container">
      <div className="editarperfil-card">
        <h1>Editar Perfil</h1>

        <div className="foto-section">
          {perfil.foto ? (
            <img src={perfil.foto} alt="Foto de perfil" className="foto-preview" />
          ) : (
            <div className="foto-placeholder">Sem foto</div>
          )}
          <input
            type="text"
            name="foto"
            placeholder="URL da foto de perfil"
            value={perfil.foto}
            onChange={handleChange}
          />
        </div>

        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={perfil.nome}
          onChange={handleChange}
        />

        <label>Usuário</label>
        <input
          type="text"
          name="usuario"
          value={perfil.usuario}
          onChange={handleChange}
        />

        <button onClick={handleSave} className="btn-primary">
          Salvar Alterações
        </button>

        <Link to="/dashboard" className="btn-secondary">
          Cancelar
        </Link>
      </div>
    </div>
  );
}
