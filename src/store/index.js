import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbar: {
      show: true,
      active: 'home',
    },

    userInfo: {},
  },
  getters: {
    getConfigByPage(state) {
      return (module, pageName) =>
        state.pageConfigs.find(
          (page) => page.moduleId === module && page.name === pageName
        );
    },
  },

  mutations: {
    setTabbar(state, payload) {
      state.tabbar = { ...state.tabbar, ...payload };
    },
    
    setPageConfigs(state, payload) {
      state.pageConfigs = payload;
    },

    setUserInfo(state, payload) {
      state.userInfo = payload;
    }
  },

  modules: {},
});
