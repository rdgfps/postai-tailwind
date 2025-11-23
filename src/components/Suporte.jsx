import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-5 font-sans">
      <a 
        href="#" 
        className="flex items-center gap-2 mb-6 cursor-pointer text-gray-900 text-sm font-semibold no-underline md:hidden"
        onClick={(e) => { e.preventDefault(); window.history.back(); }}
      >
        ← Voltar
      </a>

      <h1 className="text-2xl font-bold text-gray-900 mb-1.5 md:text-3xl">
        Central de Ajuda
      </h1>
      <p className="text-gray-600 text-sm mb-6 md:text-base">
        Encontre respostas rápidas ou fale com nossa equipe de suporte.
      </p>

      <div className="flex items-center bg-white rounded-xl shadow-sm p-3 w-full mb-8 md:w-96">
        <input 
          type="text" 
          placeholder="Buscar ajuda..." 
          className="border-none outline-none ml-2 text-sm w-full text-gray-700 bg-transparent"
        />
      </div>

      <div className="flex flex-col gap-4 mb-8 md:flex-row md:gap-5">
        <div className="bg-white flex items-start gap-3 rounded-xl p-4 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex-1 min-w-0 md:min-w-[260px]">
          <div>
            <h3 className="text-gray-900 text-base font-medium m-0">Configurações de Conta</h3>
            <p className="text-gray-600 text-sm mt-1 m-0">Gerencie seu perfil e preferências</p>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-500 flex items-start gap-3 rounded-xl p-4 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex-1 min-w-0 md:min-w-[260px]">
          <div>
            <h3 className="text-gray-900 text-base font-medium m-0">Publicação de Conteúdo</h3>
            <p className="text-gray-600 text-sm mt-1 m-0">Aprenda a criar e publicar posts</p>
          </div>
        </div>

        <div className="bg-white flex items-start gap-3 rounded-xl p-4 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex-1 min-w-0 md:min-w-[260px]">
          <div>
            <h3 className="text-gray-900 text-base font-medium m-0">Problemas Técnicos</h3>
            <p className="text-gray-600 text-sm mt-1 m-0">Resolva erros e dificuldades técnicas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm mb-8 md:p-6">
        <h2 className="text-gray-900 text-lg font-semibold mb-4">Perguntas Frequentes</h2>

        <div className="mb-4">
          <h4 className="text-gray-800 text-sm font-medium mb-2">Como altero minha senha?</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Para alterar sua senha, vá até as configurações da conta e selecione "Alterar Senha".
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-gray-800 text-sm font-medium mb-2">Como publico um novo post?</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Clique no botão "+" no dashboard, adicione conteúdo e clique em Publicar.
          </p>
        </div>

        <div className="mb-0">
          <h4 className="text-gray-800 text-sm font-medium mb-2">O que fazer se o app não carregar?</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Verifique sua conexão, atualize o app ou entre em contato com o suporte.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 text-center shadow-sm md:p-7">
        <h2 className="text-gray-900 text-lg font-semibold mb-2">Precisa de mais ajuda?</h2>
        <p className="text-gray-600 text-sm mb-5">Nossa equipe está pronta para ajudar você.</p>
        
        <button className="bg-orange-500 text-white font-semibold rounded-lg py-3 px-5 text-sm w-full max-w-[280px] block mx-auto mb-3 transition-all duration-200 hover:bg-orange-600 md:w-56 md:inline-block md:mx-2">
          Abrir Chat de Suporte
        </button>
        
        <button className="bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg py-3 px-5 text-sm w-full max-w-[280px] block mx-auto transition-all duration-200 hover:bg-gray-50 md:w-56 md:inline-block md:mx-2">
          Enviar E-mail
        </button>
      </div>
    </div>
  );
};

export default App;