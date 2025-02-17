export default defineNuxtPlugin(() => {
    const originalFetch = globalThis.$fetch;
  
    globalThis.$fetch = async (request, options = {}) => {
      const response = await originalFetch(request, options);
  
      if (response.code === "240006") {
        // Se a API retornar (token inválido), desloga o usuário
        const authStore = useAuthStore();
        authStore.logout(); // Limpa o token no store
        navigateTo("/"); // Redireciona para a página de login
      }
  
      return response;
    };
  });
  