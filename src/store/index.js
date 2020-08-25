import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabbar: {
      show: true,
      active: 'home'
    },
    // 是否已实名认证
    isAuthed: false,
    // 是否已打卡
    isClockIn: true
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
    }
  },
  modules: {}
});
