import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbar: {
      show: true,
      active: 'home',
    },
    // 是否已实名认证
    isAuthed: false,
    // 是否已打卡
    isClockIn: false,

    practiseSign: {
      start: '',
      end: '',
    },
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
    authed(state) {
      state.isAuthed = true;
    },
    clockIn(state) {
      state.isClockIn = true;
    },
    practiseSignIn(state, payload) {
      state.practiseSign = { ...state.practiseSign, ...payload };
    },

    //
    setPageConfigs(state, payload) {
      state.pageConfigs = payload;
    },
  },
  modules: {},
});
