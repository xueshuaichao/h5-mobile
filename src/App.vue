<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="tabbar.active" v-show="tabbar.show">
      <van-tabbar-item name="home" :to="{ name: 'home' }">
        首页
      </van-tabbar-item>
      <van-tabbar-item name="learning" :to="{ name: 'learning' }">
        学习
      </van-tabbar-item>
      <van-tabbar-item name="jobs" :to="{ name: 'jobs' }">
        就业
      </van-tabbar-item>
      <van-tabbar-item name="account" :to="{ name: 'account' }">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      // todo 通过vuex控制
      activeTabbar: 'home',
      showTabbar: true
    };
  },
  computed: {
    ...mapState(['tabbar'])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
