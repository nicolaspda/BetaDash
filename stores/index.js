// stores/counter.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authToken: null,
  }),
  persist: true,
  actions: {
    alterLogin(token) {
      this.authToken = token;
    },
    logout() {
      this.$reset(); // Redefine o estado para os valores iniciais
    },
  },
});
