// middleware/auth.js
import { useAuthStore } from "~/stores/index";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = authStore.authToken;

  console.log("Token:", token);

  // Verifica se não há token
  if (!token) {
    // Evita redirecionar para a mesma rota
    if (to.path !== "/") {
      return navigateTo("/"); // Redireciona para a página de login
    }
  }
  if (to.path === "/Loading") {
    return; // Permite acessar a rota Loading
  } else if (to.path !== "/Home" && token) {
    return navigateTo("/Home");
  }
});
