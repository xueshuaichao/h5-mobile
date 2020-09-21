<template>
    <div id="app" class="mohrss-app" :class="{ 'has-bottom-tabbar': tabbar.show }">
        <router-view />
        <van-tabbar
            v-model="tabbar.active"
            v-show="tabbar.show"
            active-color="#00B288"
            inactive-color="#686670"
        >
            <van-tabbar-item name="home" :to="{ name: 'home' }">
                <!-- icon="wap-home-o" -->
                <img
                    src="./assets/images/ic_shouye_xz@2x.png"
                    class="nav-icon"
                    v-if="$route.name == 'home'"
                />
                <img src="./assets/images/ic_shouye_wxz@2x.png" class="nav-icon" v-else />

                <br />首页
            </van-tabbar-item>
            <van-tabbar-item name="learning" :to="{ name: 'learning' }">
                <!-- icon="notes-o" -->
                <img
                    src="./assets/images/ic_kecheng_xz@2x.png"
                    class="nav-icon"
                    v-if="$route.name == 'learning'"
                />
                <img src="./assets/images/ic_kecheng_wxz@2x.png" class="nav-icon" v-else />
                <br />学习
            </van-tabbar-item>
            <van-tabbar-item name="jobs" :to="{ name: 'jobs' }">
                <!-- icon="records" -->
                <img
                    src="./assets/images/ic_faxian_xz@2x.png"
                    class="nav-icon"
                    v-if="$route.name == 'jobs'"
                />
                <img src="./assets/images/ic_faxian_wxz@2x.png" class="nav-icon" v-else />
                <br />学习计划
            </van-tabbar-item>
            <van-tabbar-item name="account" :to="{ name: 'account' }">
                <!-- icon="contact" -->
                <img
                    src="./assets/images/ic_geren_xz@2x.png"
                    class="nav-icon"
                    v-if="$route.name == 'account'"
                />
                <img src="./assets/images/ic_geren_wxz@2x.png" class="nav-icon" v-else />
                <br />我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["tabbar"])
    }
};
</script>

<style lang="less">
@import "./global.less";

#app {
    // height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #272f55;
    font-size: 32px;
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

.mohrss-app .van-nav-bar .van-nav-bar__arrow {
    color: #000;
}

.has-bottom-tabbar {
    padding-bottom: 100px;
}
.nav-icon {
    width: 48px;
}
</style>
