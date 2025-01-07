// stores/counter.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      authToken: null,
      loggedIn: 'false'
    }),
  persist: true,
    actions: {
      alterLogin() {
        this.authToken = localStorage.getItem('auth_token');
        this.loggedIn = localStorage.getItem('loggedIn') || 'false';
      },
      logout() {
        this.$reset(); // Redefine o estado para os valores iniciais
      },
    },
  });