// middleware/auth.js
import { useAuthStore } from '~/stores/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = authStore.authToken
  const loggedIn = authStore.loggedIn

  console.log("Token:", token);
  console.log("Logged In:", loggedIn);

  // Verifica se não há token ou se o usuário não está logado
  if (!token || loggedIn == "false") {
    // Evita redirecionar para a mesma rota
    if (to.path !== "/") {
      return navigateTo("/"); // Redireciona para a página de login
    }
  } else if (to.path !== "/Home" && token) {
    return navigateTo("/Home");
  } 
});
