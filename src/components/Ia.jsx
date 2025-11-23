import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineTool } from "react-icons/ai";

export default function Ia() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-5">
      <div className="bg-white p-10 md:p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in">
        <AiOutlineTool className="text-6xl md:text-5xl text-orange-500 mb-5 mx-auto" />
        <h1 className="text-3xl md:text-2xl font-bold text-gray-800 mb-3">
          Em Obras
        </h1>
        <p className="text-base text-gray-600 mb-3 leading-relaxed">
          Estamos preparando uma área especial com recursos de inteligência
          artificial para potencializar seus posts.
        </p>
        <p className="text-gray-500 italic mb-6">
          Em breve, novas ferramentas estarão disponíveis aqui.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold no-underline transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  );
}