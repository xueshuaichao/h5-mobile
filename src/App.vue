<template>
    <div id="app" class="mohrss-app" :class="{ 'has-bottom-tabbar': tabbar.show }">
        <router-view />
        <van-tabbar
            v-model="tabbar.active"
            v-show="tabbar.show"
            active-color="#E85A3A"
            inactive-color="#A7ADBB"
        >
            <van-tabbar-item name="home" :to="{ name: 'home' }">
                <img
                    src="./assets/app/home-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'home'"
                />
                <img src="./assets/app/home.png" class="nav-icon" v-else />

                <br />首页
            </van-tabbar-item>
            <van-tabbar-item name="course" :to="{ name: 'course' }">
                <img
                    src="./assets/app/course-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'course'"
                />
                <img src="./assets/app/course.png" class="nav-icon" v-else />
                <br />课程中心
            </van-tabbar-item>
            <van-tabbar-item name="learning" :to="{ name: 'learning' }">
                <img
                    src="./assets/app/learning-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'learning'"
                />
                <img src="./assets/app/learning.png" class="nav-icon" v-else />
                <br />学习计划
            </van-tabbar-item>
            <van-tabbar-item name="account" :to="{ name: 'account' }">
                <img
                    src="./assets/app/account-active.png"
                    class="nav-icon"
                    v-if="$route.name == 'account'"
                />
                <img src="./assets/app/account.png" class="nav-icon" v-else />
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
    color: @active;
}

.mohrss-app .van-nav-bar .van-nav-bar__arrow {
    color: #272F55;
}

.has-bottom-tabbar {
    padding-bottom: 100px;
}
.nav-icon {
    width: 44px;
}
</style>
