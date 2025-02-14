// stores/configStore.js
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('Config', {
  state: () => ({
    selectedList: null,
    selectedQtdCompras: null,
    selectedLastPurchaseTotal: null,
    selectedTotalGasto: null
  }),
  persist: true, // Pinia já salva e recupera os dados automaticamente
  actions: {
    saveSelectedList(list) {
      this.selectedList = list;
    },
    saveQtdCompras(value) {
      this.selectedQtdCompras = value;
    },
    saveTotalGasto(value) {
      this.selectedTotalGasto = value;
    },
    saveLastPurchaseTotal(value) {
      this.selectedLastPurchaseTotal = value;
    },
    clearFields() {
      this.selectedQtdCompras = null;
      this.selectedLastPurchaseTotal = null;
      this.selectedTotalGasto = null;
    },
  },
});
