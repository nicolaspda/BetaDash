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
        this.selectedQtdCompras = localStorage.getItem('selectedQtdCompras');
        this.selectedLastPurchaseTotal = localStorage.getItem('selectedLastPurchaseTotal');
        this.selectedTotalGasto = localStorage.getItem('selectedTotalGasto');
      },
      clearFields() {
        this.selectedQtdCompras = null;
        this.selectedLastPurchaseTotal = null;
        this.selectedTotalGasto = null;
      },     
    },
  });