import React, { useState, useEffect } from "react";
import "../styles/CalendarioPosts.css";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const anos = [2024, 2025, 2026, 2027];
const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

  const CalendarioPosts = () => {
    const [indiceMes, setIndiceMes] = useState(new Date().getMonth());
  const [indiceAno, setIndiceAno] = useState(new Date().getFullYear());

  const mudarMes = (direcao) => {
    setIndiceMes((atual) => {
      let novoMes = atual + (direcao === "proximo" ? 1 : -1);
      if (novoMes > 11) {
        novoMes = 0;
        setIndiceAno((ano) => ano + 1);
      } else if (novoMes < 0) {
        novoMes = 11;
        setIndiceAno((ano) => ano - 1);
      }
      return novoMes;
    });
  };

  const mudarAno = (direcao) => {
    setIndiceAno((atual) => atual + (direcao === "proximo" ? 1 : -1));
  };

  const mesAtual = meses[indiceMes];
  const anoAtual = indiceAno;

  const getDiasDoMes = (ano, mes) => {
    const data = new Date(ano, mes, 1);
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const diasDaSemanaInicio = data.getDay();
    const dias = [];
    for (let i = 0; i < diasDaSemanaInicio; i++) {
      dias.push(null);
    }

    for (let i = 1; i <= diasNoMes; i++) {
      dias.push(i);
    }

    return dias;
  };

  const diasDoMesAtual = getDiasDoMes(anoAtual, indiceMes);

  return (
    <div className="calendario-container">
      <div className="calendario-header">
        <h2>Calendário de Posts</h2>
        <button className="btn-novo-post">
          <Plus size={18} />
          <a href="/criar-post">Criar Novo Post</a>
        </button>
      </div>

      <div className="calendario-controles">
        <button className="seta" onClick={() => mudarMes("anterior")}>
          <ChevronLeft size={18} />
        </button>
        <h3>{mesAtual} {anoAtual}</h3>
        <button className="seta" onClick={() => mudarMes("proximo")}>
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="filtros">
        <button className="ativo">Todos</button>
        <button>Instagram</button>
        <button>Facebook</button>
        <button>Twitter</button>
        <button>LinkedIn</button>
      </div>

      <div className="grade-calendario">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
          <div key={dia} className="dia-titulo">
            {dia}
          </div>
        ))}

        {diasDoMesAtual.map((dia, i) => (
          <div key={i} className={`dia-card ${dia === null ? "empty" : ""}`}>
            {dia && <span className="numero-dia">{dia}</span>}
            {dia === 1 && <span className="post-dot instagram"></span>}
            {dia === 3 && <span className="post-dot facebook"></span>}
            {dia === 10 && <span className="post-dot agendado"></span>}
          </div>
        ))}
      </div>

      <div className="legenda-container">
        <h4>Legenda</h4>
        <div className="legenda">
          <span className="dot instagram"></span> Instagram
          <span className="dot facebook"></span> Facebook
          <span className="dot twitter"></span> Twitter
          <span className="dot linkedin"></span> LinkedIn
          <span className="dot agendado"></span> Agendado
          <span className="dot publicado"></span> Publicado
          <span className="dot rascunho"></span> Rascunho
        </div>
      </div>
    </div>
  );
};

export default CalendarioPosts;