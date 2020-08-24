import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbar: {
      show: true,
      active: 'home'
    }
  },
  mutations: {
    setTabbar(state, payload) {
      state.tabbar = { ...state.tabbar, ...payload };
    }
  },
  modules: {}
});
