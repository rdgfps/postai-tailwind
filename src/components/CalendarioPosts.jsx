import React, { useState } from "react";
import { 
  AiOutlinePlus, 
  AiOutlineLeft, 
  AiOutlineRight 
} from "react-icons/ai";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const anosDisponiveis = [2024, 2025, 2026, 2027];

const CalendarioPosts = () => {
  const [indiceMes, setIndiceMes] = useState(new Date().getMonth());
  const [indiceAno, setIndiceAno] = useState(new Date().getFullYear());

  const mudarMes = (direcao) => {
    setIndiceMes((atual) => {
      let novoMes = atual + (direcao === "proximo" ? 1 : -1);
      let novoAno = indiceAno;

      if (novoMes > 11) {
        novoMes = 0;
        novoAno = getProximoAno(novoAno);
      } else if (novoMes < 0) {
        novoMes = 11;
        novoAno = getAnoAnterior(novoAno);
      }

      if (novoAno !== indiceAno) {
        setIndiceAno(novoAno);
      }

      return novoMes;
    });
  };

  const getProximoAno = (anoAtual) => {
    const anoIndex = anosDisponiveis.indexOf(anoAtual);
    if (anoIndex === -1 || anoIndex === anosDisponiveis.length - 1) {
      return anosDisponiveis[0];
    }
    return anosDisponiveis[anoIndex + 1];
  };

  const getAnoAnterior = (anoAtual) => {
    const anoIndex = anosDisponiveis.indexOf(anoAtual);
    if (anoIndex === -1 || anoIndex === 0) {
      return anosDisponiveis[anosDisponiveis.length - 1];
    }
    return anosDisponiveis[anoIndex - 1];
  };

  const mudarAno = (direcao) => {
    setIndiceAno((atual) => {
      if (direcao === "proximo") {
        return getProximoAno(atual);
      } else {
        return getAnoAnterior(atual);
      }
    });
  };

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

  const diasDoMesAtual = getDiasDoMes(indiceAno, indiceMes);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Calendário de Posts</h2>
          </div>

          <div className="flex justify-center items-center gap-3">
            <button 
              className="border-none bg-white rounded-lg p-2 cursor-pointer shadow-sm transition-all duration-200 hover:bg-orange-500 hover:text-white"
              onClick={() => mudarMes("anterior")}
            >
              <AiOutlineLeft size={18} />
            </button>
            
            <div className="flex items-center gap-3">
              <button 
                className="border-none bg-white rounded-lg p-1 cursor-pointer shadow-sm transition-all duration-200 hover:bg-orange-500 hover:text-white text-sm"
                onClick={() => mudarAno("anterior")}
              >
                <AiOutlineLeft size={14} />
              </button>
              
              <h3 className="text-xl font-semibold text-gray-800">
                {meses[indiceMes]} {indiceAno}
              </h3>
              
              <button 
                className="border-none bg-white rounded-lg p-1 cursor-pointer shadow-sm transition-all duration-200 hover:bg-orange-500 hover:text-white text-sm"
                onClick={() => mudarAno("proximo")}
              >
                <AiOutlineRight size={14} />
              </button>
            </div>

            <button 
              className="border-none bg-white rounded-lg p-2 cursor-pointer shadow-sm transition-all duration-200 hover:bg-orange-500 hover:text-white"
              onClick={() => mudarMes("proximo")}
            >
              <AiOutlineRight size={18} />
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Anos disponíveis: {anosDisponiveis.join(", ")}
          </div>

          <div className="flex justify-center gap-2.5 flex-wrap">
            <button className="bg-orange-500 text-white border border-orange-500 rounded-lg py-1.5 px-3 cursor-pointer font-medium transition-all duration-200">
              Todos
            </button>
            <button className="bg-white border border-gray-300 rounded-lg py-1.5 px-3 cursor-pointer font-medium transition-all duration-200 hover:border-orange-500 hover:text-orange-500">
              Instagram
            </button>
            <button className="bg-white border border-gray-300 rounded-lg py-1.5 px-3 cursor-pointer font-medium transition-all duration-200 hover:border-orange-500 hover:text-orange-500">
              Facebook
            </button>
            <button className="bg-white border border-gray-300 rounded-lg py-1.5 px-3 cursor-pointer font-medium transition-all duration-200 hover:border-orange-500 hover:text-orange-500">
              Twitter
            </button>
            <button className="bg-white border border-gray-300 rounded-lg py-1.5 px-3 cursor-pointer font-medium transition-all duration-200 hover:border-orange-500 hover:text-orange-500">
              LinkedIn
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4 bg-white p-6 rounded-xl shadow-sm">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
              <div key={dia} className="text-center font-semibold text-gray-700 text-sm pb-2">
                {dia}
              </div>
            ))}

            {diasDoMesAtual.map((dia, index) => (
              <div 
                key={`${indiceAno}-${indiceMes}-${dia || `empty-${index}`}`}
                className={`bg-gray-50 rounded-xl p-4 h-24 relative transition-all duration-200 hover:bg-white hover:shadow-md ${
                  dia === null ? "invisible" : ""
                }`}
              >
                {dia && <span className="font-bold text-gray-900">{dia}</span>}
                {dia === 1 && <span className="w-2 h-2 rounded-full bg-pink-600 absolute bottom-2.5 left-2.5"></span>}
                {dia === 3 && <span className="w-2 h-2 rounded-full bg-blue-600 absolute bottom-2.5 left-2.5"></span>}
                {dia === 10 && <span className="w-2 h-2 rounded-full bg-green-500 absolute bottom-2.5 left-2.5"></span>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h4 className="mb-2.5 text-gray-900 font-semibold">Legenda</h4>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-600 inline-block"></span>
                Instagram
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                Facebook
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span>
                Twitter
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-700 inline-block"></span>
                LinkedIn
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                Agendado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                Publicado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioPosts;