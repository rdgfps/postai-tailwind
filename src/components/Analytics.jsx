import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineInfoCircle
} from "react-icons/ai";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa";
import EngagementChart from "./EngagementChart.jsx";

const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const ChartIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const PlusIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const MobileNav = ({ location }) => {
  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center ${
        location.pathname === to ? "text-orange-500" : "text-gray-500"
      } text-2xl p-3 transition hover:text-orange-400`}
    >
      <Icon />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center z-50 md:hidden">
      <NavItem to="/dashboard" icon={HomeIcon} label="Início" />
      <NavItem to="/analytics" icon={ChartIcon} label="Estatísticas" />
      <NavItem to="/criar-post" icon={PlusIcon} label="Criar" />
      <NavItem to="/perfil" icon={UserIcon} label="Perfil" />
      <NavItem to="/configuracoes" icon={SettingsIcon} label="Configurações" />
    </div>
  );
};

const colorVariants = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  pink: { bg: "bg-pink-50", text: "text-pink-600" },
  green: { bg: "bg-green-50", text: "text-green-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-600" },
  gray: { bg: "bg-gray-50", text: "text-gray-600" }
};

const MetricCard = ({ icon: Icon, title, value, change, color = "gray" }) => {
  const { bg, text } = colorVariants[color] || colorVariants.gray;
  const isPositive = change >= 0;

  return (
    <div className={`relative bg-white p-4 rounded-xl shadow-md border-l-4 ${isPositive ? "border-green-500" : "border-red-500"}`}>
      <div className={`absolute top-3 right-3 p-2 rounded-full ${bg}`}>
        <Icon className={`${text} text-lg`} />
      </div>

      <p className="text-xs text-gray-600 mb-1">{title}</p>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{value}</h2>

      <div className={`flex items-center text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
        <span>{isPositive ? "▲" : "▼"}</span>
        <span className="ml-1">{Math.abs(change)}% vs. Mês Anterior</span>
      </div>
    </div>
  );
};

const Analytics = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Análise de Desempenho</h1>
            <p className="text-gray-600 text-sm mt-1">
              Acompanhe o desempenho dos seus posts e engajamento 📊
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
            <select className="w-full sm:w-auto p-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none">
              <option>Últimos 30 Dias</option>
              <option>Últimos 7 Dias</option>
              <option>Últimos 90 Dias</option>
            </select>
            <button className="w-full sm:w-auto bg-orange-500 text-white px-3 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors shadow-md">
              Exportar CSV
            </button>
          </div>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <MetricCard icon={AiOutlineUser} title="Seguidores Ganhos" value="1.200" change={5.2} color="blue" />
          <MetricCard icon={FaHeart} title="Engajamento Total" value="45.8K" change={-1.5} color="pink" />
          <MetricCard icon={AiOutlineInfoCircle} title="Alcance Único" value="350K" change={12.8} color="green" />
          <MetricCard icon={FaComment} title="Taxa de Conversão" value="2.5%" change={0.9} color="orange" />
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Tendência de Engajamento</h2>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <EngagementChart />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Melhores Posts (Mês)</h2>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <div className="flex items-center">
                <AiOutlineInfoCircle className="text-gray-500 mr-2 text-lg" />
                <span className="font-medium text-gray-800 text-sm">Guia Completo de Novidades do Instagram 2024</span>
              </div>

              <div className="flex gap-4 text-gray-600 text-xs items-center">
                <span className="flex items-center"><FaHeart className="mr-1" />1.2K</span>
                <span className="flex items-center"><FaComment className="mr-1" />350</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3">
              <div className="flex items-center">
                <AiOutlineInfoCircle className="text-gray-500 mr-2 text-lg" />
                <span className="font-medium text-gray-800 text-sm">5 Dicas de Copywriting com IA</span>
              </div>

              <div className="flex gap-4 text-gray-600 text-xs items-center">
                <span className="flex items-center"><FaHeart className="mr-1" />980</span>
                <span className="flex items-center"><FaShareAlt className="mr-1" />52</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <MobileNav location={location} />
    </div>
  );
};

export default Analytics;