import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/ucenter';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbar: {
      show: true,
      active: 'home',
    },
    userInfo: null,
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
  actions: {
      getUserInfo({ state }) {
        return api.getUserInfo().then(({ data }) => {
            const info = data.user_info;
            state.userInfo = data.user_info;
            return info;
        });
    },
  },
});
