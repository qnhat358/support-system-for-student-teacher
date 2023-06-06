import { defineStore } from "pinia";

export const useLoaderStore = defineStore({
  id: "loader",
  state: () => ({
    loadingModal: 0,
  }),
  getters: {},
  actions: {
    setLoadingModal(val) {
      val ? this.loadingModal++ : (this.loadingModal > 0 ? this.loadingModal-- : this.loadingModal = 0);
    },
  },
});
