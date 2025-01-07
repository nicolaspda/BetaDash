// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("auth_token"); // PASSAR ISSO PARA STORE COM PINIA
  const loggedIn = localStorage.getItem("loggedIn"); // PASSAR ISSO PARA STORE COM PINIA

  console.log("Token:", token);
  console.log("Logged In:", loggedIn);

  // Verifica se não há token ou se o usuário não está logado
  if (!token || loggedIn == "false") {
    // Evita redirecionar para a mesma rota
    if (to.path !== "/") {
      return navigateTo("/"); // Redireciona para a página de login
    }
  } else if (to.path !== "/Home") {
    return navigateTo("/Home");
  }
});
