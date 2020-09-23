import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/course',
    name: 'course',
    component: () => import('../views/course/index.vue')
  },
  {
    path: '/learning',
    name: 'learning',
    component: () => import('../views/learning/index.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/account/index.vue')
  },

  // 设置
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/setting/index.vue')
  },
  {
    path: '/setting/name',
    name: 'SetName',
    component: () => import('../views/setting/name.vue')
  },
  {
    path: '/setting/photo',
    name: 'SetPhoto',
    component: () => import('../views/setting/photo.vue')
  },
  {
    path: '/setting/password',
    name: 'SetPassword',
    component: () => import('../views/setting/password.vue')
  },
  {
    path: '/setting/phone',
    name: 'SetPhone',
    component: () => import('../views/setting/phone.vue')
  },
  
  // 个人评估
  {
   path: '/assessment',
   name: 'Assessment',
   component: () => import('../views/account/assessment.vue') 
  },

  // 任务筛选
  {
    path: '/screen',
    name: 'screenList',
    component: () => import('../blocks/task/screen.vue')
  },

  // 区域单位
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/setting/company.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//
const SHOW_TABBARS = ['home', 'course', 'learning', 'account'];
router.beforeEach((to, from, next) => {
  if (SHOW_TABBARS.includes(to.name)) {
    store.commit('setTabbar', {
      show: true,
      active: to.name
    });
  } else {
    store.commit('setTabbar', { show: false });
  }
  next();
});

export default router;
