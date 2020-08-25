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
    path: '/geo_location',
    name: 'location',
    component: () => import('../views/geo/index.vue')
  },
  {
    path: '/face_detect',
    name: 'faceDetect',
    component: () => import('../views/auth/face-detect.vue')
  },
  {
    path: '/learning/home',
    name: 'learning',
    component: () => import('../views/learning/index.vue')
  },
  {
    path: '/learning/practise',
    name: 'practise',
    component: () => import('../views/learning/practise.vue')
  },
  {
    path: '/learning/exam',
    name: 'exam',
    component: () => import('../views/learning/exam.vue')
  },
  {
    path: '/learning/homework',
    name: 'homework',
    component: () => import('../views/learning/exam.vue')
  },
  {
    path: '/learning/report',
    name: 'report',
    component: () => import('../views/learning/report.vue')
  },
  {
    path: '/learning/train/:id',
    name: 'trainDetail',
    component: () => import('../views/learning/train-detail.vue')
  },
  {
    path: '/learning/course/:id',
    name: 'courseDetail',
    component: () => import('../views/learning/course.vue')
  },
  {
    path: '/learning/live/:id',
    name: 'liveDetail',
    component: () => import('../views/learning/live.vue')
  },
  {
    path: '/job',
    name: 'jobs',
    component: () => import('../views/job/index.vue')
  },
  {
    path: '/course/list',
    name: 'courseList',
    component: () => import('../views/home/course.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/account/index.vue')
  },
  {
    path: '/identification/index',
    name: 'identification',
    component: () => import('../views/identification/index.vue')
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
  if (SHOW_TABBARS.includes(to.name)) {
    store.commit('setTabbar', {
      show: true,
      active: to.name
    });
  } else {
    store.commit('setTabbar', { show: false });
  }
  if (to.name === 'learning' && !store.state.isAuthed) {
    return next({
      name: 'identification',
      query: {
        callback: to.fullPath
      }
    });
  }
  if (to.name === 'trainDetail' && !store.state.isClockIn) {
    return next({
      name: 'location',
      query: {
        callback: to.fullPath
      }
    });
  }
  next();
});

export default router;
