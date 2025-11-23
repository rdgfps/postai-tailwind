import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineBarChart,
  AiOutlinePlusCircle,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineInfoCircle
} from "react-icons/ai";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa";
import EngagementChart from "./EngagementChart.jsx";

const colorVariants = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  pink: { bg: "bg-pink-50", text: "text-pink-600" },
  green: { bg: "bg-green-50", text: "text-green-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-600" },
  gray: { bg: "bg-slate-50", text: "text-slate-600" }
};

const MobileNav = ({ location }) => (
  <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-4 flex justify-between px-8 z-50 border-t border-slate-200">
    <Link to="/dashboard" className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100">
      <AiFillHome className={`text-2xl ${location.pathname === "/dashboard" ? "text-blue-600" : "text-slate-400"}`} />
    </Link>
    <Link to="/analytics" className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100">
      <AiOutlineBarChart className={`text-2xl ${location.pathname === "/analytics" ? "text-blue-600" : "text-slate-400"}`} />
    </Link>
    <Link to="/criar-post" className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100">
      <AiOutlinePlusCircle className={`text-2xl ${location.pathname === "/criar-post" ? "text-blue-600" : "text-slate-400"}`} />
    </Link>
    <Link to="/perfil" className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100">
      <AiOutlineUser className={`text-2xl ${location.pathname === "/perfil" ? "text-blue-600" : "text-slate-400"}`} />
    </Link>
    <Link to="/configuracoes" className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100">
      <AiOutlineSetting className={`text-2xl ${location.pathname === "/configuracoes" ? "text-blue-600" : "text-slate-400"}`} />
    </Link>
  </nav>
);

const MetricCard = ({ icon: Icon, title, value, change, color = "gray" }) => {
  const { bg, text } = colorVariants[color] || colorVariants.gray;
  const isPositive = change >= 0;

  return (
    <div className={`relative bg-white p-6 rounded-xl shadow-md border-l-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${isPositive ? "border-green-500" : "border-red-500"}`}>
      <div className={`absolute top-4 right-4 p-3 rounded-full ${bg}`}>
        <Icon className={`${text} text-xl`} />
      </div>

      <p className="text-sm text-slate-500 mb-2">{title}</p>
      <h2 className="text-3xl font-bold text-slate-800 mb-3">{value}</h2>

      <div className={`flex items-center text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
        <span>{isPositive ? "▲" : "▼"}</span>
        <span className="ml-1">{Math.abs(change)}% vs. Mês Anterior</span>
      </div>
    </div>
  );
};

const Analytics = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <h1 className="text-3xl font-bold text-slate-900">Análise de Desempenho</h1>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <select className="p-3 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200">
              <option>Últimos 30 Dias</option>
              <option>Últimos 7 Dias</option>
              <option>Últimos 90 Dias</option>
            </select>
            <button className="p-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200">
              Exportar CSV
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard icon={AiOutlineUser} title="Seguidores Ganhos" value="1.200" change={5.2} color="blue" />
          <MetricCard icon={FaHeart} title="Engajamento Total" value="45.8K" change={-1.5} color="pink" />
          <MetricCard icon={AiOutlineBarChart} title="Alcance Único" value="350K" change={12.8} color="green" />
          <MetricCard icon={FaComment} title="Taxa de Conversão" value="2.5%" change={0.9} color="orange" />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Tendência de Engajamento</h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <EngagementChart />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Melhores Posts (Mês)</h2>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center py-4 border-b border-slate-200">
              <div className="flex items-center">
                <AiOutlineInfoCircle className="text-slate-500 mr-3 text-xl" />
                <span className="font-medium text-slate-800">Post: "Guia Completo de Novidades do Instagram 2024"</span>
              </div>

              <div className="flex gap-6 text-slate-600 text-sm items-center">
                <span className="flex items-center"><FaHeart className="mr-1" />1.2K</span>
                <span className="flex items-center"><FaComment className="mr-1" />350</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <AiOutlineInfoCircle className="text-slate-500 mr-3 text-xl" />
                <span className="font-medium text-slate-800">Post: "5 Dicas de Copywriting com IA"</span>
              </div>

              <div className="flex gap-6 text-slate-600 text-sm items-center">
                <span className="flex items-center"><FaHeart className="mr-1" />980</span>
                <span className="flex items-center"><FaShareAlt className="mr-1" />52</span>
              </div>
            </div>
          </div>
        </section>
      </div>

     
    </div>
  );
};

export default Analytics;
