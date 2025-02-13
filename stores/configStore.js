// stores/configStore.js
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('Config', {
    state: () => ({
      selectedList: null,
      selectedQtdCompras: null,
      selectedLastPurchaseTotal: null,
      selectedTotalGasto: null

    }),
  persist: true,
    actions: {
      alterConfig() {
        this.selectedList = localStorage.getItem('selectedList');
      },
      logout() {
        this.$reset(); // Redefine o estado para os valores iniciais
      },
    },
  });