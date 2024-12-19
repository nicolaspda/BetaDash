export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuth();
    if (!auth.isAuthenticated.value && to.name !== 'login') {
      return navigateTo('/index');
    }
  });
  