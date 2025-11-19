import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AiOutlineArrowLeft,
    AiFillHome,
    AiOutlineBarChart,
    AiOutlinePlusCircle,
    AiOutlineUser,
    AiOutlineSetting
} from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useState } from 'react';

const CriarPost = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        legenda: '',
        horario: '',
        data: '',
        imagemUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.legenda || !formData.data || !formData.horario || !formData.imagemUrl) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Por favor, preencha todos os campos antes de salvar.",
                icon: "warning"
            });
            return;
        }

        // 🔹 Cria o novo post
        const novoPost = {
            ...formData,
            status: 'agendado'
        };

        // 🔹 Recupera posts existentes e adiciona o novo
        const postsExistentes = JSON.parse(localStorage.getItem('posts')) || [];
        postsExistentes.push(novoPost);
        localStorage.setItem('posts', JSON.stringify(postsExistentes));

        // 🔹 Atualiza contador de posts agendados
        const agendados = JSON.parse(localStorage.getItem('agendados')) || 0;
        localStorage.setItem('agendados', agendados + 1);

        Swal.fire({
            title: "Post criado!",
            text: "Sua postagem foi agendada com sucesso!",
            icon: "success"
        }).then(() => {
            navigate('/dashboard');
        });
    };

    const NavItem = ({ to, icon: Icon }) => (
        <Link 
            to={to} 
            className={`text-gray-500 text-xl p-2.5 transition-colors duration-200 ${
                location.pathname === to ? 'text-orange-500' : 'hover:text-orange-500'
            }`}
        >
            <Icon />
        </Link>
    );

    return (
        <div className="pb-16 md:max-w-[700px] md:mx-auto md:pt-5">
            <header className="flex justify-between items-center px-5 py-3.75 bg-gray-50 border-b border-gray-200 mb-5 md:border-b-0 md:p-0 md:mb-7.5">
                <Link to="/dashboard" className="text-orange-500 text-xl pr-3.75">
                    <AiOutlineArrowLeft />
                </Link>
                <h1 className="text-xl font-bold text-gray-800 grow text-center">Criar Postagem</h1>
                <button 
                    className="bg-orange-500 text-white border-none px-4.5 py-2 rounded-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-orange-600" 
                    onClick={handleSubmit}
                >
                    Agendar
                </button>
            </header>

            <section className="px-5 text-black bg-white">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 text-black bg-white">
                    <label className="text-base font-semibold text-gray-600 mt-3.75 mb-1.25">Legenda</label>
                    <textarea
                        name="legenda"
                        placeholder="Digite a legenda da postagem..."
                        value={formData.legenda}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg box-border text-base transition-all duration-200 text-black bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none resize-vertical min-h-[100px] leading-relaxed"
                    />

                    <label className="text-base font-semibold text-gray-600 mt-3.75 mb-1.25">Data</label>
                    <input
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg box-border text-base transition-all duration-200 text-black bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                    />

                    <label className="text-base font-semibold text-gray-600 mt-3.75 mb-1.25">Horário</label>
                    <input
                        type="time"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg box-border text-base transition-all duration-200 text-black bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                    />

                    <label className="text-base font-semibold text-gray-600 mt-3.75 mb-1.25">URL da Imagem</label>
                    <input
                        type="url"
                        name="imagemUrl"
                        placeholder="https://exemplo.com/imagem.jpg"
                        value={formData.imagemUrl}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg box-border text-base transition-all duration-200 text-black bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none"
                    />

                    {formData.imagemUrl && (
                        <div className="mt-5 p-2.5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
                            <img 
                                src={formData.imagemUrl} 
                                alt="Prévia da imagem" 
                                className="max-w-full h-auto block rounded-lg object-contain"
                            />
                        </div>
                    )}
                </form>
            </section>

        </div>
    );
};

export default CriarPost;
