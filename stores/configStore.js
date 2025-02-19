// stores/configStore.js
import { defineStore } from "pinia";

export const useConfigStore = defineStore("Config", {
  state: () => ({
    selectedList: null,
    selectedQtdCompras: null,
    selectedLastPurchaseDate: null,
    selectedTotalGasto: null,
    selectedTicketMedio: null,
  }),
  persist: {
    storage: import.meta.client ? localStorage : null, //Mantém os dados no LocalStorage
  },
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
    saveLastPurchaseDate(value) {
      this.selectedLastPurchaseDate = value;
    },
    saveTicketMedio(value) {
      this.selectedTicketMedio = value;
    },
    clearFields() {
      this.selectedQtdCompras = null;
      this.selectedLastPurchaseDate = null;
      this.selectedTotalGasto = null;
    },
  },
});
