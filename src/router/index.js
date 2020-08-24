import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue')
  },
  {
    path: '/learning/home',
    name: 'learning',
    component: () => import('../views/learning/index.vue')
  },
  {
    path: '/train/detail/:id',
    name: 'traingDetail',
    component: () => import('../views/learning/train-detail.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//
const SHOW_TABBARS = ['home', 'learning', 'jobs', 'account'];
router.beforeEach((to, from, next) => {
  console.log(to);
  if (SHOW_TABBARS.includes(to.name)) {
    store.commit('setTabbar', {
      show: true,
      active: to.name
    });
    console.log(store.state.tabbar);
  } else {
    store.commit('setTabbar', { show: false });
  }
  next();
});

export default router;
