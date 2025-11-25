const API_URL = "http://localhost:3001";

export const postService = {
  async verificarEPublicarPostsAgendados() {
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) throw new Error("Erro ao buscar posts");
      
      const posts = await response.json();
      const agora = new Date();
      
      const postsParaPublicar = posts.filter(post => 
        post.status === "agendado" && 
        new Date(post.data) <= agora
      );

      for (const post of postsParaPublicar) {
        await fetch(`${API_URL}/posts/${post.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...post,
            status: "publicado",
            publicadoEm: new Date().toISOString()
          }),
        });
      }
    } catch (error) {
      console.error("Erro ao verificar posts agendados:", error);
    }
  },

  async buscarEstatisticas(usuarioId) {
    try {
      if (!usuarioId || usuarioId === "null" || usuarioId === "undefined") {
        return { total: 0, publicados: 0, agendados: 0, rascunhos: 0 };
      }

      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) throw new Error("Erro ao buscar posts");
      
      const posts = await response.json();
      const postsDoUsuario = posts.filter(post => 
        post.usuarioId && post.usuarioId.toString() === usuarioId.toString()
      );
      
      return {
        total: postsDoUsuario.length,
        publicados: postsDoUsuario.filter(post => post.status === "publicado").length,
        agendados: postsDoUsuario.filter(post => post.status === "agendado").length,
        rascunhos: postsDoUsuario.filter(post => post.status === "rascunho").length,
      };
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      return { total: 0, publicados: 0, agendados: 0, rascunhos: 0 };
    }
  }
};