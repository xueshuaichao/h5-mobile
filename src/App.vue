<template>
  <div id="app" :class="{ 'has-bottom-tabbar': tabbar.show }">
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
  computed: {
    ...mapState(['tabbar'])
  }
};
</script>

<style lang="less">
@import './global.less';

#app {
  // height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #272F55;
  font-size: 16px;
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

.van-nav-bar__arrow {
  color: #000 !important;
}

.has-bottom-tabbar {
  padding-bottom: 50px;
}
</style>
