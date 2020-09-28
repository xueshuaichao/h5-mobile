/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api/ucenter';

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
    userInfo: null,
  },

  getters: {
    getConfigByPage(state) {
      return (module, pageName) =>
        state.pageConfigs.find(
          (page) => page.moduleId === module && page.name === pageName
        );
    },
    getUserInfo(state) {
      return state.userInfo;
    }
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
    //   getUserInfo({ state }) {
    //     return api.getUserInfo().then(({ data }) => {
    //         const info = data.user_info;
    //         state.userInfo = data.user_info;
    //         return info;
    //     });
    // },
  },
});
