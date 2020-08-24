<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="activeTabbar" v-show="showTabbar">
      <van-tabbar-item name="home" to="/">
        首页
      </van-tabbar-item>
      <van-tabbar-item name="learning" to="/">
        学习
      </van-tabbar-item>
      <van-tabbar-item name="jobs" to="/">
        就业
      </van-tabbar-item>
      <van-tabbar-item name="account" to="/">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // todo 通过vuex控制
      activeTabbar: 'home',
      showTabbar: true
    };
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
