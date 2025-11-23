import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineTool } from "react-icons/ai";
import "../styles/Ia.css";

<div className="bg-red-500 text-white p-10">TESTE TAILWIND</div>


export default function Ia() {
  return (
    <div className="ia-container">
      <div className="ia-card">
        <AiOutlineTool className="ia-icon" />
        <h1>Em Obras</h1>
        <p>
          Estamos preparando uma área especial com recursos de inteligência
          artificial para potencializar seus posts.
        </p>
        <p className="ia-subtext">
          Em breve, novas ferramentas estarão disponíveis aqui.
        </p>
        <Link to="/dashboard" className="ia-btn">
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
}
