import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: (key) => sessionStorage.removeItem(key)  
      }
    })    
  ],

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
