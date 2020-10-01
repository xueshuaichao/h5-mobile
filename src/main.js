import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import customPlugins from'./plugins';
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
import './variables.less';
import './libs/rem.js';

Vue.use(Vant);
Vue.use(customPlugins);

Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');
const getPageConfigs = Promise.resolve([
  {
      uri: '/',
      layout: [
          {
              aid: 'aid_1',
              block_id: [11, 12],
              block_instance_id: [111, 121],
          },
      ],
      name: 'home',
      templateId: 4, // templateId 对应layouts下的layout
      type: 2,
      moduleId: 1, // 系统模块 1 课程中心2 试题中心3 4 任务中心
      setting: [
          {
              bid: 111,
              block_id: 11,
              setting: null,
          },
          {
              bid: 121,
              block_id: 12,
              setting: null,
          },
      ],
  },
  {
      uri: '/course',
      name: 'course',
      layout: [
          {
              aid: 'aid_1',
              block_id: [23],
              block_instance_id: [231],
          },
      ],
      templateId: 4,
      type: 2,
      moduleId: 2,
      setting: [
          {
              bid: 231,
              block_id: 23,
              setting: null,
          },
      ],
  },
  {
    uri: '/test',
    name: 'test',
    layout: [
        {
            aid: 'aid_1',
            block_id: [15],
            block_instance_id: [151],
        },
    ],
    templateId: 4,
    type: 2,
    moduleId: 2,
    setting: [
        {
            bid: 231,
            block_id: 23,
            setting: null,
        },
    ],
},
]);

getPageConfigs.then((data) => {
  // todo
  data.forEach((v) => {
      // eslint-disable-next-line no-param-reassign
      v.layout = JSON.stringify(v.layout);
  });
  console.log(router, 'before---')
  store.commit('setPageConfigs', data);
  // 根据后端pages定义路由
  const routes = data
      .filter(page => !!page.uri && page.uri[0] === '/')
      .map((page) => {
          const route = {
              path: page.uri,
              name: page.name,
              component: () => import('./views/common_page.vue'),
              meta: {
                  moduleId: page.moduleId,
                  name: page.name,
              },
          };
          return route;
      });
    console.log(routes, 'add router')
  router.addRoutes(routes);

  new Vue({
      router,
      store,
      render: h => h(App),
  }).$mount('#app');
});
